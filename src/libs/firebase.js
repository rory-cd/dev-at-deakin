import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { getFirestore, doc, getDoc, getDocs, setDoc, collection, addDoc, serverTimestamp, updateDoc, arrayUnion, query, orderBy, limit, increment, deleteDoc } from "firebase/firestore";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "dev-at-deakin-3414c.firebaseapp.com",
  projectId: "dev-at-deakin-3414c",
  storageBucket: "dev-at-deakin-3414c.firebasestorage.app",
  messagingSenderId: "225654200839",
  appId: "1:225654200839:web:2674adc7e3e5c1a06be8a2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseConfig);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);

// -------------
// AI
// -------------
// Initialize the Gemini Developer API backend service
const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

// Create a `GenerativeModel` instance
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash-lite" });

// Load chat history from Firestore
export const getChatHistory = async (userId, questionId) => {
  // Get all messages in chat
  const collRef = collection(db, 'chats', userId, 'questions', questionId, 'messages');
  if (!collRef) return null;
  const q = query(collRef, orderBy("createdAt", "asc"));

  const messages = await getDocs(q);

  // Map each message to a format Gemini expects for history
  const history = messages.docs.map(doc => {
    const data = doc.data();
    console.log(data)
    return {
      role: data.role,
      parts: data.parts
    }
  });

  return history;
}

// Get chat instance (before first message sent)
export const createChatInstance = (history) => {

  // Remove double-up initial message (The second message is only for front end)
  history = history.splice(1, 1);

  // Start a chat
  const chat = model.startChat({
    history: history,
    generationConfig: { maxOutputTokens: 100 }
  });
  return chat;
}

// AI chat function using Gemini
// If this is the first message
export const promptAIChat = async (instance, history, input, question) => {
  const user = auth.currentUser;
  const userData = await getUserDoc(user.uid);
  let prompt = input;
  
  // If this is the first message
  if (history.length < 1) {
    // Build initial prompt
    prompt = `I'm a developer named ${userData.name}.
      I'm a student at Deakin University. I'm on a website called DEV@Deakin.
      Another student asked the question "${question.title}" and said "${question.description}". I was wondering ${input}.
      Keep all your responses in this conversation concise (no more than 3-4 sentences) with plain text only - no markdown.`;

    // Add prompt to database
    const collRef = collection(db, 'chats', user.uid, 'questions', question.id, 'messages');
    await addDoc(collRef, {
      role: "user",
      parts: [{ text: prompt }],
      createdAt: serverTimestamp()
    });
  }

  // Add input to database
  const collRef = collection(db, 'chats', user.uid, 'questions', question.id, 'messages');
  await addDoc(collRef, {
    role: "user",
    parts: [{ text: input }],
    createdAt: serverTimestamp()
  });


  // Generate a response
  const result = await instance.sendMessage(prompt);
  const response = result.response;
  const aiMessage = {
    role: "model",
    parts: [{ text: response.text() }],
    createdAt: serverTimestamp()
  }
  // Log the reponse to the database
  await addDoc(collRef, aiMessage);

  return aiMessage;
}

// -------------
// USER MANAGEMENT
// -------------
// Sign up with email/password
export const signUp = async (name, email, password, tier) => {
  // Create credentials
  const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredentials.user;

  // Set default profile photo
  const defaultPhotoUrl = "https://firebasestorage.googleapis.com/v0/b/dev-at-deakin-3414c.firebasestorage.app/o/profiles%2F1758514444816.png?alt=media&token=aa0275d8-dba0-485b-8fd1-b8bd42bb0d1c";

  await updateProfile(user, {
    photoURL: defaultPhotoUrl
  })

  // Create user doc
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    name: name,
    hiddenQuestions: [],
    tier: tier,
    photoURL: defaultPhotoUrl,
    createdAt: serverTimestamp()
  });

  return user;
}

// Log in wrapper
export const logIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// Log out wrapper
export const logOut = () => auth.signOut();

// Start password reset process
export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
      handleCodeInApp: true
    });
    return { success: true, message: "Password reset email sent." }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

// Gets the currently logged in user
export const getCurrentUser = async () => {
  return auth.currentUser;
}

// -------------
// USER DATA
// -------------
// Gets the user doc for a specified user
export const getUserDoc = async (uid) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc) return userDoc.data();
  return null;
}

// Gets the user doc for the current user
export const getCurrentUserDoc = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (userDoc) return userDoc.data();
  return null;
}

// Updates the given field of the current user's doc with the given value
export const updateUserDoc = async (field, value) => {
  const user = auth.currentUser;
  if (!user) return null;

  const docRef = doc(db, 'users', user.uid);

  // If the update is to hidden questions, add to the field, otherwise replace it
  if (field == "hiddenQuestions") {
    await updateDoc(docRef, {
      hiddenQuestions: arrayUnion(value)
    });
  } else {
    await updateDoc(docRef, { [field]: value });
  }
}

// Gets the profile picture for the given user
export const getUserProfilePic = async (uid) => {
  const userData = await getUserDoc(uid);
  return userData.photoURL || null;
}

// Updates the current user's profile picture
export const updateProfilePic = async (newUrl) => {
  const user = auth.currentUser;

  await updateProfile(user, {
    photoURL: newUrl
  })

  await updateUserDoc("photoURL", newUrl);
}

// Gets a list of questions the current user has hidden
export const getHiddenQuestions = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (userDoc) return userDoc.data()?.hiddenQuestions;
  return null;
}

// -------------
// IMAGES
// -------------
// Upload image
export const uploadImage = async (file, folder, Id) => {
  const ext = file.name.split('.').pop();
  const storageRef = ref(storage, `${folder}/${Id}.${ext}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

// -------------
// POSTS
// -------------
// Post article
export const postArticle = async (title, abstract, content, tags, imgUrl) => {
  const user = auth.currentUser;

  // Create article doc with random ID
  const docRef = await addDoc(collection(db, 'articles'), {
    author: user.uid,
    title: title,
    abstract: abstract,
    content: content,
    tags: tags,
    imgUrl: imgUrl,
    createdAt: serverTimestamp()
  });

  return docRef;
}

// Post question
export const postQuestion = async (type, title, description, tags) => {
  const user = auth.currentUser;

  // Create question doc with random ID
  const docRef = await addDoc(collection(db, 'questions'), {
    author: user.uid,
    type: type,
    title: title,
    description: description,
    tags: tags,
    createdAt: serverTimestamp()
  });

  return docRef;
}

// Gets all entries from a given collection
export const getAllEntriesFrom = async (collection_name) => {
  const querySnapshot = await getDocs(collection(db, collection_name));
  const entries = querySnapshot.docs.map((doc) => {
    // Extract firestore timestamp so the data is a plain object for passing
    const {createdAt, ...data} = doc.data();
    return {
      id: doc.id,
      date: createdAt?.toDate().setHours(0,0,0,0) || null,
      ...data
    }
  });

  return entries;
}

// Gets all entries from a given collection, sorted by most recent
export const getAllMostRecentFrom = async (collection_name) => {

  const q = query(
    collection(db, collection_name),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  const entries = querySnapshot.docs.map((doc) => {
    // Extract firestore timestamp so the data is a plain object for passing
    const {createdAt, ...data} = doc.data();
    return {
      id: doc.id,
      date: createdAt?.toDate().setHours(0,0,0,0) || null,
      ...data
    }
  });

  return entries;
}

// Gets the x most recent entries from a given collection
export const getMostRecentFrom = async (collection_name, entry_count) => {

  const q = query(
    collection(db, collection_name),
    orderBy("createdAt", "desc"),
    limit(entry_count)
  );

  const querySnapshot = await getDocs(q);
  const entries = querySnapshot.docs.map((doc) => {
    // Extract firestore timestamp so the data is a plain object for passing
    const {createdAt, ...data} = doc.data();
    return {
      id: doc.id,
      date: createdAt?.toDate().setHours(0,0,0,0) || null,
      ...data
    }
  });

  return entries;
}

// Get an article with the provided ID
export const getArticle = async (article_id) => {
  const userDoc = await getDoc(doc(db, 'articles', article_id));
  const {createdAt, ...data} = userDoc.data();
  return {
    id: userDoc.id,
    date: createdAt?.toDate().setHours(0,0,0,0) || null,
    ...data
  }
}

// Get a question with the provided ID
export const getQuestion = async (question_id) => {
  const userDoc = await getDoc(doc(db, 'questions', question_id));
  const {createdAt, ...data} = userDoc.data();
  return {
    id: userDoc.id,
    date: createdAt?.toDate().setHours(0,0,0,0) || null,
    ...data
  }
}

// -------------
// COMMENTS
// -------------
// Gets all comments for a given post
export const getAllComments = async (postId, collection_name) => {

  // Build query
  const q = query(
    collection(db, collection_name, postId, "comments"),
    orderBy("createdAt", "asc")
  );

  // Get the comments
  const querySnapshot = await getDocs(q);
  // Re-structure them for easier front end use
  const entries = querySnapshot.docs.map((doc) => {
    const {createdAt, lastEditedAt, ...data} = doc.data();
    console.log(createdAt?.toDate());
    return {
      id: doc.id,
      createdAt: createdAt?.toDate() || null,
      lastEditedAt: lastEditedAt?.toDate() || null,
      ...data
    }
  });

  return entries;
}

// Posts a comment from the current user to the specified post
export const postComment = async (documentId, collectionName, comment) => {
  try {
    const userId = auth.currentUser.uid;
  
    // Create comment doc with random ID
    const docRef = await addDoc(collection(db, collectionName, documentId, "comments"), {
      author: userId,
      text: comment,
      likes: 0,
      createdAt: serverTimestamp(),
      lastEditedAt: serverTimestamp()
    });

    return docRef;

  } catch (err) {
    console.log(err.message);
  }
}

// Edits the contents of a comment
export const editComment = async (commentId, documentId, collectionName, newComment) => {
  try {
    const docRef = doc(db, collectionName, documentId, "comments", commentId);
    await updateDoc(docRef, {
      text: newComment,
      lastEditedAt: serverTimestamp()
    });

    return docRef;

  } catch (err) {
    console.log(err.message);
  }
}

// -------------
// LIKES
// -------------
// Checks whether the user has liked a comment
export const hasLiked = async (collectionName, postId, commentId) => {
  const userId = auth.currentUser.uid;
  const likeRef = doc(db, collectionName, postId, "comments", commentId, "likes", userId);
  const likeDoc = await getDoc(likeRef);
  return likeDoc.exists();
}

// Record user's like
export const likeComment = async (collectionName, postId, commentId) => {
  try {
    const userId = auth.currentUser.uid;
    const commentRef = doc(db, collectionName, postId, "comments", commentId);
    const likeRef = doc(db, collectionName, postId, "comments", commentId, "likes", userId);
    const likeDoc = await getDoc(likeRef);

    if (likeDoc.exists()) {
      // Already liked - unlike
      await deleteDoc(likeRef);
      await updateDoc(commentRef, { likes: increment(-1) });
      return "unliked";
    } else {
      // Not like yet - like
      await setDoc(likeRef, {createdAt: serverTimestamp()});
      await updateDoc(commentRef, {likes: increment(1)});
      return "liked";
    }
  } catch (err) {
    console.log(err.message);
  }
}

// -------------
// RATINGS
// -------------
// Gets the article rating for the currently logged in user
export const getUserRating = async (articleId) => {
  try {
    const userId = auth.currentUser.uid;
    const userRatingRef = doc(db, 'articles', articleId, "userRatings", userId);
    const rating = await getDoc(userRatingRef);
    return rating;
  } catch (err) {
    console.log(err.message);
  }
}

// Sets an article rating for the currently logged in user
export const rateArticle = async (articleId, userRating) => {
  try {
    const userId = auth.currentUser.uid;
    const userRatingRef = doc(db, 'articles', articleId, "userRatings", userId);
    
    // Get the article
    const articleRef = doc(db, 'articles', articleId);
    const article = await getDoc(articleRef);
    const data = article?.data();
    
    // Add to the article's rating count
    const oldRating = await getDoc(userRatingRef);
    const hasRatedBefore = oldRating.exists();
    const prev = oldRating?.data()?.value || 0;   // Get the user's last rating, if it exists
    let newCount = data?.ratingCount || 0;        // Get the total rating count for the article
    if (!hasRatedBefore) newCount++;

    // Rate the article
    await setDoc(userRatingRef, { value: userRating });
    
    // If article not yet rated
    if (!data?.rating || !data?.ratingCount) {
      // Set rating to userRating and count to 1
      await updateDoc(articleRef, {
        rating: userRating,
        ratingCount: newCount
      });
      return { userRating, newCount };
    }
      
    // Calculate the average rating
    const sum = data.rating * data.ratingCount - prev + userRating;
    const newAvg = sum / newCount;

    // Update the new average rating and count
    await updateDoc(articleRef, {
      rating: newAvg,
      ratingCount: newCount
    });

    return { newAvg, newCount };
  } catch (err) {
    console.log(err.message);
  }
}