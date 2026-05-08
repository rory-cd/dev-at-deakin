"use client";

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useReducer } from 'react';
import { getCurrentUserDoc, updateUserDoc } from '@/libs/firebase';

// Set context - select provider fields to be utilised. Initial values only used if no provider above in the tree.
export const UserContext = createContext(
  {
    isAuthReady: false,
    user: null,
    userData: null,
    updateUserData: () => null,
    hideQuestion: () => null
  }
);

// Reducer for updating user state (user + user doc/data)
function userReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_USER_DATA":
      return {
        ...state,
        userData: { ...state.userData, ...action.payload}
      };
    
    case "HIDE_QUESTION":
      const questionId = action.payload;
      const existing = state.userData?.hiddenQuestions || [];
      const newValue = existing.includes(questionId) ? existing : [...existing, questionId];
      return {
        ...state,
        userData: { ...state.userData, hiddenQuestions: newValue }
      }
    
    case "SET_AUTH_READY":
      return { ...state, isAuthReady: true }

    case "RESET":
      return { user: null, userData: null, isAuthReady: true } 
  }
  console.error("Unknown action: " + action.type);
}

// Wraps children, passing down state
export default function UserProvider({ children, initialUser, initialUserData }) {
  const auth = getAuth();

  const [state, dispatch] = useReducer(userReducer, {
    user: initialUser,
    userData: initialUserData,
    isAuthReady: false
  });

  // Update field in user data
  const updateUserData = async (field, value) => {
    if (!state.user) return;

    // Local update
    dispatch({ type: "SET_USER_DATA", payload: { [field]: value } });
    // Firestore update
    try {
      await updateUserDoc(field, value);
    } catch (err) {
      console.error("Failed to update Firestore", err);
    }
  };

  // Hide a question
  const hideQuestion = async (questionId) => {
    if (!state.user) return;

    // Local update
    dispatch({ type: "HIDE_QUESTION", payload: questionId });

    // Firestore update
    try {
      await updateUserDoc("hiddenQuestions", questionId);
    } catch (err) {
      console.error("Failed to update Firestore", err);
    }
  };

  // Subscribe to Firebase state changes on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userFb) => {
      if (userFb) {
        dispatch({ type: "SET_USER", payload: userFb });
        const userDoc = await getCurrentUserDoc();
        dispatch({ type: "SET_USER_DATA", payload: userDoc });
      } else {
        dispatch({ type: "RESET" });
      }

      dispatch({ type: "SET_AUTH_READY" });
    });

    // Unsubscribe on unmount
    return () => unsubscribe();
  }, [auth]);

  // Tell context which fields are available
  const value = { ...state, updateUserData, hideQuestion };

  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
}