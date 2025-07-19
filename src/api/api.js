// src/api/api.js
import axios from "axios";

const BASE_URL = "https://localhost:7110/api";

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

export const getNotes = async (subject, page = 1, pageSize = 5) => {
  try {
    const res = await axios.get(`${BASE_URL}/notes/${subject}`, {
      params: { page, pageSize }
    });
    return {
      notes: res.data,
      totalPages: Math.ceil(res.headers['x-total-count'] / pageSize),
      currentPage: page
    };
  } catch (err) {
    console.error("Error fetching notes:", err);
    return { notes: [], totalPages: 1, currentPage: 1 };
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await axios.post(`${BASE_URL}/notes`, noteData);
    return response.data;
  } catch (error) {
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