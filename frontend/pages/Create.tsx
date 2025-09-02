import { useState } from "react";
import QuestionInput from "../components/QuestionInput";
import { createQuiz } from "../services/api";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  text: string;
  type: "input" | "radio" | "checkbox";
  answers: Answer[];
}

export default function CreateQuizPage() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState("");

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
      setError("Quiz must have a title and at least one question");
      return;
    }

    try {
      const quiz = await createQuiz({ title, description: "", authorId: 1 });
      const quizId = quiz.id;

      for (const q of questions) {
        const questionRes = await fetch(`http://localhost:4000/api/questions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: q.text, type: q.type, quizId }),
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
      setTitle("");
      setQuestions([]);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to create quiz. Make sure backend is running.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-6">
      <button
        className="mb-4 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => window.history.back()}
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

      {error && <p className="text-red-500 mb-2">{error}</p>}

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