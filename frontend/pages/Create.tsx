import { useState } from "react";
import QuestionInput from "../components/QuestionInput";
import { createQuiz } from "../services/api";
import { useNavigate } from "react-router-dom";

export type QuestionType = "input" | "checkbox" | "radio";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  text: string;
  type: QuestionType;
  answers: Answer[];
}

export default function CreateQuizPage() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "input", answers: [] }]);
  };

  const updateQuestion = (index: number, updated: Question) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updated;
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || questions.length === 0) {
      alert("Quiz must have a title and at least one question");
      return;
    }

    try {
      const quizRes = await createQuiz({ title, description: "", authorId: 1 });
      const quizId = quizRes.id;

      for (const q of questions) {
        const questionRes = await fetch(`http://localhost:4000/api/questions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: q.text, quizId, type: q.type }),
        });
        const questionData = await questionRes.json();

        for (const a of q.answers) {
          await fetch(`http://localhost:4000/api/answers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: a.text, isCorrect: a.isCorrect, questionId: questionData.id }),
          });
        }
      }

      alert("Quiz created!");
      navigate("/quizzes");
    } catch (err) {
      console.error(err);
      alert("Failed to create quiz");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-6">
      <button
        onClick={() => navigate("/quizzes")}
        className="mb-4 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Back
      </button>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quiz title"
        className="border p-2 rounded w-full mb-4"
      />

      {questions.map((q, i) => (
        <QuestionInput
          key={i}
          question={q.text}
          type={q.type}
          answers={q.answers}
          onChangeQuestion={(text) => updateQuestion(i, { ...q, text })}
          onChangeType={(type) => updateQuestion(i, { ...q, type })}
          onChangeAnswers={(answers) => updateQuestion(i, { ...q, answers })}
          onRemoveQuestion={() => removeQuestion(i)}
        />
      ))}

      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={addQuestion}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add Question
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
}