import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Quizzes from "./pages/quizzes/index";
import QuizDetail from "./pages/quizzes/QuizDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/quizzes" replace />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quizzes/:id" element={<QuizDetail />} />
      </Routes>
    </BrowserRouter>
  );
}