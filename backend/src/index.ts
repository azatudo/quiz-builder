import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ================== HEALTH ==================
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// ================== ROOT ==================
app.get("/", (_req: Request, res: Response) => {
  res.send("Quiz Builder API is running 🚀");
});

// ================== USERS ==================

// Create user
app.post("/api/users", async (req: Request, res: Response) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({ data: { email, name } });
    res.json(user);
  } catch {
    res.status(400).json({ error: "User already exists or invalid data" });
  }
});

// Get all users
app.get("/api/users", async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({ include: { quizzes: true } });
  res.json(users);
});

// Get user by id
app.get("/api/users/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id },
    include: { quizzes: true },
  });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// Delete user
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.user.delete({ where: { id } });
    res.json({ message: "User deleted successfully" });
  } catch {
    res.status(404).json({ error: "User not found" });
  }
});

// ================== QUIZZES ==================

// Create quiz
app.post("/api/quizzes", async (req: Request, res: Response) => {
  const { title, description, authorId } = req.body;
  try {
    const quiz = await prisma.quiz.create({
      data: { title, description, authorId },
    });
    res.json(quiz);
  } catch {
    res.status(400).json({ error: "Invalid data or author not found" });
  }
});

// Get all quizzes
app.get("/api/quizzes", async (_req: Request, res: Response) => {
  const quizzes = await prisma.quiz.findMany({
    include: { author: true, questions: true },
  });
  res.json(quizzes);
});

// Get quiz by id
app.get("/api/quizzes/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: { author: true, questions: { include: { answers: true } } },
  });
  if (!quiz) return res.status(404).json({ error: "Quiz not found" });
  res.json(quiz);
});

// Delete quiz
app.delete("/api/quizzes/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.quiz.delete({ where: { id } });
    res.json({ message: "Quiz deleted successfully" });
  } catch {
    res.status(404).json({ error: "Quiz not found" });
  }
});

// ================== QUESTIONS ==================

// Create question
app.post("/api/questions", async (req: Request, res: Response) => {
  const { text, quizId } = req.body;
  try {
    const question = await prisma.question.create({ data: { text, quizId } });
    res.json(question);
  } catch {
    res.status(400).json({ error: "Invalid data or quiz not found" });
  }
});

// Get all questions
app.get("/api/questions", async (_req: Request, res: Response) => {
  const questions = await prisma.question.findMany({
    include: { answers: true, quiz: true },
  });
  res.json(questions);
});

// Get question by id
app.get("/api/questions/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const question = await prisma.question.findUnique({
    where: { id },
    include: { answers: true, quiz: true },
  });
  if (!question) return res.status(404).json({ error: "Question not found" });
  res.json(question);
});

// Delete question
app.delete("/api/questions/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.question.delete({ where: { id } });
    res.json({ message: "Question deleted successfully" });
  } catch {
    res.status(404).json({ error: "Question not found" });
  }
});

// ================== ANSWERS ==================

// Create answer
app.post("/api/answers", async (req: Request, res: Response) => {
  const { text, isCorrect, questionId } = req.body;
  try {
    const answer = await prisma.answer.create({
      data: { text, isCorrect, questionId },
    });
    res.json(answer);
  } catch {
    res.status(400).json({ error: "Invalid data or question not found" });
  }
});

// Get all answers
app.get("/api/answers", async (_req: Request, res: Response) => {
  const answers = await prisma.answer.findMany({
    include: { question: true },
  });
  res.json(answers);
});

// Get answer by id
app.get("/api/answers/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const answer = await prisma.answer.findUnique({
    where: { id },
    include: { question: true },
  });
  if (!answer) return res.status(404).json({ error: "Answer not found" });
  res.json(answer);
});

// Delete answer
app.delete("/api/answers/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.answer.delete({ where: { id } });
    res.json({ message: "Answer deleted successfully" });
  } catch {
    res.status(404).json({ error: "Answer not found" });
  }
});

// ================== ERROR HANDLER ==================
app.use(
  (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err instanceof Error ? err.message : String(err),
    });
  }
);

// ================== START SERVER ==================
const server = app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});
