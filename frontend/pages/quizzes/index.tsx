import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";
import { Quiz } from "../../types";

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = await axios.get<Quiz[]>("http://localhost:4000/api/quizzes");
        setQuizzes(res.data); // res.data есть, т.к. мы типизировали axios.get<Quiz[]>
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/quizzes/${id}`);
      setQuizzes(quizzes.filter((q) => q.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 max-w-3xl mx-auto mt-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Quizzes</h1>
          <Link
            to="/create"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create Quiz
          </Link>
        </div>

        {loading ? (
          <p>Loading quizzes...</p>
        ) : quizzes.length === 0 ? (
          <p className="text-gray-600">No quizzes yet. Click "Create Quiz" to add one!</p>
        ) : (
          <ul className="space-y-4">
            {quizzes.map((q) => (
              <li
                key={q.id}
                className="p-4 bg-white rounded shadow flex justify-between items-center"
              >
                <div>
                  <Link
                    to={`/quizzes/${q.id}`}
                    className="text-xl font-semibold text-blue-500 hover:underline"
                  >
                    {q.title}
                  </Link>
                  <p className="text-gray-600">{q.questions.length} questions</p>
                </div>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(q.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}