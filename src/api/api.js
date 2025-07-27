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
    
    return {
      items: res.data.items || res.data,
      pageNumber: page,
      pageSize: pageSize,
      totalCount: res.data.totalCount || res.headers['x-total-count'] || 0,
      totalPages: res.data.totalPages || Math.ceil((res.data.totalCount || res.headers['x-total-count'] || 0) / pageSize)
    };
  } catch (err) {
    console.error("Error fetching notes:", err);
    throw err;
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
};

  export const fetchQuestionCategories = async () => {
  const response = await fetch(`${BASE_URL}/questionscategories`);
  return await response.json();
};


export const getAllQuestionCategories = async () => {
  const response = await fetch(`${BASE_URL}/questionscategories`);
  if (!response.ok) throw new Error('Failed to fetch question categories');
  return await response.json();
};


export const fetchRandomQuestions = async (categoryId, count = 10) => {
  const response = await fetch(
    `${BASE_URL}/questions/random?categoryId=${categoryId}&count=${count}`
  );
  return await response.json();
};
export const getAllCategories = async () => {
  const response = await fetch('https://localhost:7110/api/QuestionCategory');
  if (!response.ok) throw new Error('Failed to fetch categories');
  return await response.json();
};
export const fetchQuestionsBySubject = async (subjectId) => {
  const response = await fetch(`${BASE_URL}/questions?subjectId=${subjectId}`);
  return await response.json();
};

export const fetchSubjectsByCategory = async (categoryId) => {
  const response = await fetch(`${BASE_URL}/QuestionCategory/${categoryId}`);
  return await response.json(); 
};


export const getQuestionsByCategory = async (categoryId) => {
  try {
    const response = await fetch(`${BASE_URL}/Question/byCategory/${categoryId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      questions: data, // assuming your API returns an array of questions
      category: { name: "Category Name" } // replace with actual name if API returns it
    };
  } catch (err) {
    console.error("Error fetching questions:", err);
    throw new Error("Failed to fetch questions");
  }
};
