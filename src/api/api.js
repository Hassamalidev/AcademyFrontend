import axios from "axios";

const BASE_URL = "https://localhost:7110/api"; // ✅ correct

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
