import axios from "axios";
import { Quiz, Question, Answer } from "../types";

const API_URL = "http://localhost:4000/api";

// Quizzes
export const getQuizzes = async (): Promise<Quiz[]> => {
  const res = await axios.get<Quiz[]>(`${API_URL}/quizzes`);
  return res.data;
};

export const getQuiz = async (id: number | string): Promise<Quiz> => {
  const res = await axios.get<Quiz>(`${API_URL}/quizzes/${id}`);
  return res.data;
};

export const deleteQuiz = async (id: number | string): Promise<void> => {
  await axios.delete(`${API_URL}/quizzes/${id}`);
};

export const createQuiz = async (data: {
  title: string;
  description?: string;
  authorId: number;
}): Promise<Quiz> => {
  const res = await axios.post<Quiz>(`${API_URL}/quizzes`, data);
  return res.data;
};

export const createQuestion = async (
  quizId: number,
  text: string,
  type: "input" | "checkbox" | "radio"
): Promise<Question> => {
  const res = await axios.post<Question>(`${API_URL}/questions`, { text, quizId, type });
  return res.data;
};

export const createAnswer = async (
  questionId: number,
  text: string,
  isCorrect: boolean
): Promise<Answer> => {
  const res = await axios.post<Answer>(`${API_URL}/answers`, { text, isCorrect, questionId });
  return res.data;
};