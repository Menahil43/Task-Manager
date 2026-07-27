# 📋 Task Manager - Full-Stack CRUD Application

A complete full-stack CRUD application for managing tasks, built with **Node.js + Express + MongoDB** (backend) and **React + Vite** (frontend).

## 🚀 Features

### Backend (REST API)
- ✅ Full CRUD operations: Create, Read, Update, Delete tasks
- ✅ MongoDB integration with Mongoose ODM
- ✅ Request validation with express-validator
- ✅ Meaningful HTTP status codes and JSON responses
- ✅ Centralized error handling middleware
- ✅ Clean architecture: controllers, routes, models, middleware
- ✅ Environment variable configuration

### Frontend (React + Vite)
- ✅ Responsive UI with modern design
- ✅ Axios for API communication
- ✅ Form to create and edit tasks
- ✅ List displaying all tasks with priority badges
- ✅ Edit functionality with pre-filled form
- ✅ Delete with confirmation dialog
- ✅ Auto-refresh UI after CRUD operations (no page reload)
- ✅ Loading indicators during all operations
- ✅ Success/error notification messages
- ✅ Empty state when no tasks exist
- ✅ Disabled buttons during requests
- ✅ Clean, modular, reusable components

## 📂 Project Structure

```
task-manager/
├── server/                    # Backend
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── taskController.js  # CRUD logic
│   ├── middleware/
│   │   └── errorHandler.js    # Error handling
│   ├── models/
│   │   └── Task.js            # Task schema/model
│   ├── routes/
│   │   └── taskRoutes.js      # API routes + validation
│   ├── .env.example           # Environment variable template
│   ├── package.json
│   └── server.js              # Entry point
├── client/                    # Frontend
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Notification.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   ├── services/
│   │   │   └── api.js         # Axios API service
│   │   ├── styles/
│   │   │   └── index.css      # Global styles
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## 📚 API Documentation

### Base URL: `http://localhost:5000/api`

| Method | Endpoint            | Description         | HTTP Status Codes          |
|--------|---------------------|---------------------|----------------------------|
| GET    | `/api/tasks`        | Get all tasks       | 200                        |
| GET    | `/api/tasks/:id`    | Get single task     | 200, 400, 404              |
| POST   | `/api/tasks`        | Create new task     | 201, 400                   |
| PUT    | `/api/tasks/:id`    | Update task         | 200, 400, 404              |
| DELETE | `/api/tasks/:id`    | Delete task         | 200, 400, 404              |
| GET    | `/api/health`       | Health check        | 200                        |

### Task Schema

| Field       | Type    | Required | Default  | Validation                  |
|-------------|---------|----------|----------|-----------------------------|
| title       | String  | Yes      | -        | Max 200 characters          |
| description | String  | No       | ""       | Max 1000 characters         |
| completed   | Boolean | No       | false    | -                           |
| priority    | String  | No       | "medium" | Enum: low, medium, high     |
| createdAt   | Date    | Auto     | -        | Auto-generated timestamps   |
| updatedAt   | Date    | Auto     | -        | Auto-generated timestamps   |

### Example Request / Response

**POST /api/tasks**
```json
// Request
{
  "title": "Complete project report",
  "description": "Finish the quarterly report for review",
  "priority": "high"
}

// Response (201 Created)
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "66a3f1c8e4b0d5f1a8c9b7e1",
    "title": "Complete project report",
    "description": "Finish the quarterly report for review",
    "completed": false,
    "priority": "high",
    "createdAt": "2024-07-26T12:00:00.000Z",
    "updatedAt": "2024-07-26T12:00:00.000Z"
  }
}
```

## 🛠️ Setup & Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (installed and running locally)
- **npm** (comes with Node.js)

### 1. Navigate to project
```bash
cd task-manager
```

### 2. Backend Setup
```bash
cd server
npm install
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

## 🏃 Running the Application

### Start MongoDB
Ensure MongoDB is running locally on port 27017.

### Start Backend (Terminal 1)
```bash
cd server
npm run dev    # Development mode with nodemon
```
Server starts at: **http://localhost:5000**

### Start Frontend (Terminal 2)
```bash
cd client
npm run dev
```
Frontend starts at: **http://localhost:5173**

## 📦 Tech Stack

- **Backend**: Node.js, Express.js, Mongoose, MongoDB
- **Frontend**: React 18, Vite, Axios
- **Validation**: express-validator
- **Styling**: Pure CSS with custom properties

## 📄 License

MIT

