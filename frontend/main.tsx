import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Quizzes from "./pages/quizzes/index";
import QuizDetail from "./pages/quizzes/QuizDetail";
import CreateQuiz from "./pages/Create";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/quizzes" replace />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quizzes/:id" element={<QuizDetail />} />
        <Route path="/create" element={<CreateQuiz />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);