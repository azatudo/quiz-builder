import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  text: string;
  type: "input" | "checkbox" | "radio";
  answers: Answer[];
}

interface Quiz {
  id: number;
  title: string;
  description?: string;
  questions: Question[];
}

export default function QuizDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<Record<number, any>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios
      .get<Quiz>(`http://localhost:4000/api/quizzes/${id}`)
      .then((res) => setQuiz(res.data))
      .catch((err) => console.error(err))
      .then(() => setLoading(false)); // просто then вместо finally
  }, [id]);

  const handleSelect = (questionId: number, answerId: number, multiple: boolean) => {
    setUserAnswers((prev) => {
      const prevAnswers = prev[questionId] || [];
      if (multiple) {
        const newAnswers = prevAnswers.includes(answerId)
          ? prevAnswers.filter((a: number) => a !== answerId)
          : [...prevAnswers, answerId];
        return { ...prev, [questionId]: newAnswers };
      } else {
        return { ...prev, [questionId]: [answerId] };
      }
    });
  };

  const handleInputChange = (questionId: number, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => setSubmitted(true);

  if (loading) return <p>Loading quiz...</p>;
  if (!quiz) return <p>Quiz not found</p>;

  const score = quiz.questions.reduce((acc, q) => {
    const selected = userAnswers[q.id] || [];
    if (q.type === "input") {
      const correctAnswer = q.answers[0]?.text || "";
      if (selected === correctAnswer) return acc + 1;
    } else {
      const correct = q.answers.filter((a) => a.isCorrect).map((a) => a.id);
      if (Array.isArray(selected) && selected.length === correct.length && selected.every((a) => correct.includes(a))) {
        return acc + 1;
      }
    }
    return acc;
  }, 0);

  return (
    <>
      <Header />
      <div className="p-6 max-w-3xl mx-auto mt-6">
        <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
        {quiz.description && <p className="mb-4 text-gray-600">{quiz.description}</p>}

        {quiz.questions.map((q) => (
          <div key={q.id} className="p-4 bg-white rounded shadow mb-4">
            <h2 className="font-semibold mb-2">{q.text}</h2>

            {q.type === "input" ? (
              <input
                type="text"
                className="border p-1 rounded w-full"
                disabled={submitted}
                value={userAnswers[q.id] || ""}
                onChange={(e) => handleInputChange(q.id, e.target.value)}
              />
            ) : (
              <div className="flex flex-col gap-2">
                {q.answers.map((a: Answer) => {
                  const multiple = q.type === "checkbox";
                  const checked = Array.isArray(userAnswers[q.id]) && userAnswers[q.id].includes(a.id);
                  return (
                    <label key={a.id} className="flex items-center gap-2">
                      <input
                        type={multiple ? "checkbox" : "radio"}
                        name={`question-${q.id}`}
                        checked={checked}
                        disabled={submitted}
                        onChange={() => handleSelect(q.id, a.id, multiple)}
                      />
                      <span className={submitted && a.isCorrect ? "text-green-600 font-bold" : ""}>{a.text}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {!submitted ? (
          <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <div className="mt-4 p-4 bg-blue-50 rounded">
            <p className="font-bold">Your score: {score} / {quiz.questions.length}</p>
            <button
              className="mt-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => navigate("/quizzes")}
            >
              Back to quizzes
            </button>
          </div>
        )}
      </div>
    </>
  );
}