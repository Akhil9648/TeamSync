# WorkFlow 🚀

WorkFlow (also known as TeamSync) is a modern, comprehensive team and task management application designed for organizations. It features a robust role-based authentication system, separating standard team members from administrative Team Leaders, and provides powerful tools to manage teams, track task completion, view real-time activity logs, and visualize data reports.

## 🌟 Key Features

- **Role-Based Access Control (RBAC):** Distinct dashboards and capabilities for 'Team Leaders' (Admins) and standard 'Team Members'.
- **Team Management:** Create teams, assign leaders, add members, and monitor overall team task completion rates.
- **Task Tracking:** Full CRUD task management to monitor project progress across the organization.
- **Dynamic Dashboards:** Real-time metrics, interactive charts (using Recharts), and activity feeds.
- **User Management:** Onboard new users, edit profiles, and manage access with ease.
- **Profile Customization:** Upload and manage user avatars seamlessly via ImageKit integration.

---

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **Vite** (Build Tool)
- **Tailwind CSS v4** (Styling)
- **React Router v7** (Navigation)
- **Recharts** (Data Visualization)
- **Lucide React** (Icons)
- **Axios** (API Client)

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose** (Database & ODM)
- **JWT (JSON Web Tokens)** (Authentication)
- **Bcrypt.js** (Password Hashing)
- **ImageKit** (Cloud Image Storage)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local instance or MongoDB Atlas cluster)

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` root and configure the necessary environment variables (see below).

Start the backend development server:
```bash
npm run dev
```
*The backend will run on `http://localhost:3000` by default.*

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` root and configure the API URL.

Start the frontend development server:
```bash
npm run dev
```
*The frontend will typically run on `http://localhost:5173`.*

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
Create a `.env` file in the `backend` directory with the following variables:

| Variable | Description |
|----------|-------------|
| `PORT` | The port the server will run on (Default: 3000) |
| `MONGODB_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JSON Web Tokens |
| `IMAGEKIT_PUBLIC_KEY` | Public key for your ImageKit account |
| `IMAGEKIT_PRIVATE_KEY`| Private key for your ImageKit account |
| `IMAGEKIT_URL_ENDPOINT`| URL endpoint for your ImageKit account |

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend` directory with the following variable:

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | The URL of your backend server (e.g., `http://localhost:3000`) |

---

## 📂 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── config/      # Database connection setup
│   │   ├── controllers/ # Route logic (Auth, Users, Teams, Tasks)
│   │   ├── middleware/  # JWT Auth & Role-based middleware
│   │   ├── models/      # Mongoose Schemas (User, Team, Task)
│   │   ├── routes/      # Express API routes
│   │   └── server/      # External integrations (e.g., ImageKit)
│   ├── index.js         # Entry point for the server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── auth/        # Login/Registration components
│   │   ├── components/  # Reusable UI components
│   │   ├── config/      # API configurations
│   │   ├── pages/       # Application Pages (Dashboard, Teams, Profile)
│   │   ├── routes/      # React Router configuration
│   │   ├── App.jsx      # Main Application Component
│   │   └── index.css    # Tailwind CSS entry
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
```

---

## 🌐 API Reference

Here is a high-level overview of the available REST API endpoints:

### Auth & Users (`/api/auth`, `/api/user`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and receive JWT
- `GET /api/user` - Get all users (Admin only)
- `GET /api/user/my-teams` - Get all users within the logged-in user's teams
- `GET /api/user/me` - Get current user profile
- `PUT /api/user/:id` - Update user details
- `DELETE /api/user/:id` - Delete user

### Teams (`/api/team`)
- `GET /api/team` - Get all teams (Admin only)
- `GET /api/team/my-teams` - Get teams the logged-in user is a part of
- `POST /api/team` - Create a new team
- `PUT /api/team/:id` - Update team details
- `DELETE /api/team/:id` - Delete team

### Tasks (`/api/task`)
- `GET /api/task` - Get all tasks
- `POST /api/task` - Create a new task
- `PUT /api/task/:id` - Update task status/details
- `DELETE /api/task/:id` - Delete task

*(Note: Most routes require a valid JWT passed in the `Authorization: Bearer <token>` header.)*

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is licensed under the ISC License.