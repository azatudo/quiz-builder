# 📚 Quiz Builder

A simple full-stack **quiz builder application** built with **React, TypeScript, Tailwind CSS** (frontend) and **Express + Prisma + SQLite** (backend).

---

## ✨ Features

- 📝 Create quizzes with multiple questions  
- 🧩 Different question types:
  - **Input** (short text)  
  - **Checkbox** (multiple correct answers)  
  - **Radio** (single correct answer)  
- 🎯 Take quizzes and see your score  
- 🗑️ Delete quizzes  
- ⚡ Dynamic UI styled with **Tailwind CSS**

---

## ⚙️ Environment Setup

### 🔧 Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with your database URL:
   ```env
   DATABASE_URL="file:./dev.db"
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```

👉 Server runs on: [http://localhost:4000](http://localhost:4000)

---

### 🎨 Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend dev server:
   ```bash
   npm run dev
   ```

👉 App runs on: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Creating a Sample Quiz

1. Open the app in your browser: [http://localhost:5173](http://localhost:5173)  
2. Click on **Create Quiz**  
3. Enter a title, add questions, choose question type, add answers  
4. Submit the quiz  
5. Go to **Quizzes** page to see your quiz in the list  

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React Router  
- **Backend:** Node.js, Express, TypeScript, Prisma, SQLite  

---

## 📝 Notes

- `.env` files are not committed to the repository  
- Prisma manages the SQLite database  
- Frontend communicates with backend via REST API  
- You can delete quizzes directly from the Quizzes page  
- Quiz questions support:
  - Input from keyboard (text)  
  - Single choice (radio)  
  - Multiple choice (checkbox)  
