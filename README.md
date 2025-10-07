# 🧩 Task Board App

A **full-stack Task Management Application** built with **React (frontend)** and **Node.js + Express + MongoDB (backend)**.
Users can **create boards**, **add lists**, and **manage tasks** — just like Trello or Jira, with full **CRUD** functionality.

---

## 🚀 Tech Stack

**Frontend**

* React (Vite)
* Tailwind CSS (2025 Plugin Integration)
* Axios for API requests

**Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* dotenv & cors
* Nodemon (for local development)

---

## 📁 Folder Structure

```
Task_Board_App/
 ┣ backend/
 ┃ ┣ config/
 ┃ ┃ ┗ db.js
 ┃ ┣ controllers/
 ┃ ┃ ┣ board.controller.js
 ┃ ┃ ┣ list.controller.js
 ┃ ┃ ┗ task.controller.js
 ┃ ┣ models/
 ┃ ┃ ┣ board.model.js
 ┃ ┃ ┣ list.model.js
 ┃ ┃ ┗ task.model.js
 ┃ ┣ routes/
 ┃ ┃ ┣ board.routes.js
 ┃ ┃ ┣ list.routes.js
 ┃ ┃ ┗ task.routes.js
 ┃ ┣ app.js
 ┃ ┣ server.js
 ┃ ┣ .env
 ┃ ┗ package.json
 ┣ frontend/
 ┃ ┣ src/
 ┃ ┣ public/
 ┃ ┗ package.json
 ┣ .gitignore
 ┗ README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## 🧠 API Endpoints

### 📋 Boards

| Method | Endpoint          | Description                             |
| ------ | ----------------- | --------------------------------------- |
| POST   | `/api/boards`     | Create a new board                      |
| GET    | `/api/boards`     | Get all boards (with list/task count)   |
| GET    | `/api/boards/:id` | Get a single board with lists and tasks |
| PUT    | `/api/boards/:id` | Update a board                          |
| DELETE | `/api/boards/:id` | Delete a board and related lists/tasks  |

### 🧱 Lists

| Method | Endpoint              | Description                     |
| ------ | --------------------- | ------------------------------- |
| POST   | `/api/lists`          | Create a new list               |
| GET    | `/api/lists/:boardId` | Get all lists for a board       |
| PUT    | `/api/lists/:id`      | Update list name or position    |
| DELETE | `/api/lists/:id`      | Delete a list and related tasks |

### ✅ Tasks

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/tasks`         | Create a new task        |
| GET    | `/api/tasks/:listId` | Get all tasks for a list |
| PUT    | `/api/tasks/:id`     | Update a task            |
| DELETE | `/api/tasks/:id`     | Delete a task            |

---

## 🖥️ How to Run the Project

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/Rahul91025/task-board-app.git
cd task-board-app
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Server will run on **[http://localhost:5000](http://localhost:5000)**

Make sure MongoDB is running (local or Atlas).

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on **[http://localhost:5173](http://localhost:5173)**

---

## 🔗 Connecting Frontend and Backend

In your `frontend/src/config/api.js` (or wherever Axios base URL is set):

```js
export const API_BASE_URL = "http://localhost:5000/api";
```

Then in Axios:

```js
axios.get(`${API_BASE_URL}/boards`);
```

---

## 🧩 Features

* Create, Read, Update, Delete Boards
* Create and manage Lists under Boards
* Add and move Tasks between Lists
* Fully responsive and clean UI (Tailwind CSS)
* Modular folder structure for scalability

---

## 🧰 Available Scripts

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

### Lint & Format

```bash
npm run lint
```

---

## 🧑‍💻 Author

**Rahul Gupta**
📧 [rahul.gupta@example.com](mailto:rahul.gupta@example.com)
🌐 [GitHub Profile](https://github.com/Rahul91025)

---

