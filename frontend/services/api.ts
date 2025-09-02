import axios from "axios";
import { Quiz } from "../types";

const API_URL = "http://localhost:4000/api";

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

export const createQuiz = async (data: { title: string; description?: string; authorId: number }): Promise<Quiz> => {
  const res = await axios.post<Quiz>(`${API_URL}/quizzes`, data);
  return res.data;
};