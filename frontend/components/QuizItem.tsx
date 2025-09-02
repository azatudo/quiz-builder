import { Link } from "react-router-dom";

interface Answer {
  id: number;
  text: string;
  isCorrect?: boolean;
}

interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

interface Quiz {
  id: number;
  title: string;
  description?: string;
  questions: Question[];
}

interface Props {
  quiz: Quiz;
  onDelete: (id: number) => void;
}

export default function QuizItem({ quiz, onDelete }: Props) {
  return (
    <div className="p-4 bg-white rounded shadow flex justify-between items-center">
      <div>
        <Link to={`/quizzes/${quiz.id}`} className="text-xl font-semibold text-blue-500 hover:underline">
          {quiz.title}
        </Link>
        <p className="text-gray-600">{quiz.questions.length} questions</p>
      </div>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => onDelete(quiz.id)}
      >
        Delete
      </button>
    </div>
  );
}