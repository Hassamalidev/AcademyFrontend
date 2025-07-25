import axios from "axios";

const BASE_URL = "https://localhost:7110/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRandomQuestions = async (count = 30, categoryId = 1) => {
  try {
    const res = await axios.get(`${BASE_URL}/question/test`, {
      params: { count, categoryId }
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching questions:", err);
    return [];
  }
};

export const getNotes = async (subject, page = 1, pageSize = 6) => {
  try {
    const res = await api.get(`/notes/${subject}`, {
      params: { page, pageSize }
    });
    
    // Assuming your backend returns data in this structure:
    return {
      items: res.data.items || res.data, // Handle both formats
      pageNumber: page,
      pageSize: pageSize,
      totalCount: res.data.totalCount || res.headers['x-total-count'] || 0,
      totalPages: res.data.totalPages || Math.ceil((res.data.totalCount || res.headers['x-total-count'] || 0) / pageSize)
    };
  } catch (err) {
    console.error("Error fetching notes:", err);
    throw err; // Re-throw to handle in component
  }
};
export const createNote = async (noteData) => {
  try {
    const response = await api.post("/notes", noteData);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const submitQuestion = async (questionData) => {
  try {
    const response = await axios.post(`${BASE_URL}/questions`, questionData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
  export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  return await response.json();
};

export const fetchSubjectsByCategory = async (categoryId) => {
  const response = await fetch(`${BASE_URL}/categories/${categoryId}/subjects`);
  return await response.json();
};

export const fetchRandomQuestions = async (categoryId, count = 10) => {
  const response = await fetch(
    `${BASE_URL}/questions/random?categoryId=${categoryId}&count=${count}`
  );
  return await response.json();
};

export const fetchQuestionsBySubject = async (subjectId) => {
  const response = await fetch(`${BASE_URL}/questions?subjectId=${subjectId}`);
  return await response.json();
};
