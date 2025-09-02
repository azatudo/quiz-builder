import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between max-w-3xl mx-auto">
      <h1 className="text-xl font-bold">Quiz Builder</h1>
      <nav className="space-x-4">
        <Link to="/quizzes" className="text-blue-500 hover:underline">Quizzes</Link>
        <Link to="/create" className="text-blue-500 hover:underline">Create Quiz</Link>
      </nav>
    </header>
  );
}