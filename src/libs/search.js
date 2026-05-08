import { getAllEntriesFrom } from "./firebase";

// Performs a basic search of all articles, questions, and users in Firebase
// Gets all entries from Firebase and performs a simple forEach loop to check them
// To be refactored - not viable for large datasets
export default async function Search(searchTerm) {
  const term = searchTerm.toLowerCase();

  const results = {
    articles: [],
    questions: [],
    users: []
  };

  // Articles
  const allArticles = await getAllEntriesFrom("articles");
  allArticles.forEach(doc => {
    if (
      doc.title?.toLowerCase().includes(term) ||
      doc.abstract?.toLowerCase().includes(term) ||
      doc.content?.toLowerCase().includes(term)
    ) {
      results.articles.push(doc);
      console.log("Article found:" + doc);
    }
  });

  // Questions
  const allQuestions = await getAllEntriesFrom("questions");
  allQuestions.forEach(doc => {
    if (
      doc.title?.toLowerCase().includes(term) ||
      doc.description?.toLowerCase().includes(term) ||
      doc.content?.toLowerCase().includes(term)
    ) {
      results.questions.push(doc);
      console.log("Question found:" + doc);
    }
  });

  // Users
  const allUsers = await getAllEntriesFrom("users");
  allUsers.forEach(doc => {
    if (
      doc.name.toLowerCase().includes(term) ||
      doc.email.toLowerCase().includes(term)
    ) {
      results.questions.push(doc);
      console.log("User found:" + doc);
    }
  });

  return results;
}