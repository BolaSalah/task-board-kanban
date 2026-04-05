# 📋 Task Board Kanban

A modern and interactive Kanban board built with **React**, **Redux Toolkit**, and **Material UI (MUI)**. The application provides a smooth user experience with real-time search, dynamic UI interactions, and a mock REST API powered by **JSON Server**.

---

## 🔗 Live Demo

👉 [https://task-board-kanban-mauve.vercel.app/](https://task-board-kanban-mauve.vercel.app/)

---

## 📸 Screenshots

<p align="center">
  <img src="/screenshots/kanban-board.png" alt="Kanban Board" width="700"/>
</p>

---

## ✨ Features

- **CRUD Operations:** Easily create tasks using a fast inline form and delete tasks dynamically.
- **Kanban Board Layout:** Tasks are organized into columns (*To Do*, *In Progress*, *In Review*, and *Done*).
- **Real-time Search:** Instantly filter tasks by title or description using Redux state management.
- **Infinite Scroll:** Smooth loading experience for columns with a large number of tasks.
- **Responsive Design:** Fully optimized for both mobile and desktop devices.

---

## 🚀 Setup & Installation

Follow these steps to run the project locally:

### 1️⃣ Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/BolaSalah/task-board-kanban.git
cd task-board-kanban
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Run the Project
You need to run both the frontend and the mock backend:

Terminal 1 (Backend)
```bash
npx json-server --watch db.json --port 4000
```

Terminal 2 (Frontend)
```bash
npm run dev
```
---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Material UI (MUI)
- **State Management:** Redux Toolkit.
- **Data Fetching:** TanStack React Query & Axios.
- **Mock Backend:** JSON Server.

---

👨‍💻 Author

 Bola Salah  
 Frontend Developer (React.js)

🔗 Portfolio: https://www.bolasalah.online/  
🔗 GitHub: https://github.com/BolaSalah