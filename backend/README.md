# WorkFlow - Backend ⚙️

This directory contains the Express.js and Node.js backend server for the WorkFlow (TeamSync) application. It handles user authentication, database operations, and external API integrations, providing a secure and scalable REST API for the frontend.

## 🛠️ Technology Stack

- **Node.js & Express.js:** Fast, unopinionated, minimalist web framework for building the REST API.
- **MongoDB & Mongoose:** NoSQL database and Object Data Modeling (ODM) library for strict schema validation.
- **JSON Web Tokens (JWT):** Stateless, secure user authentication.
- **Bcrypt.js:** Robust password hashing to secure user credentials.
- **ImageKit:** Cloud-based image storage and optimization for user avatars.
- **CORS & Dotenv:** Middleware for handling cross-origin requests and environment variables.

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local installation or a MongoDB Atlas cloud URI)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root of the `backend` directory. You will need to define the following variables:

```env
# Server Port (Default is 3000)
PORT=3000

# MongoDB Connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority

# JWT Authentication Secret
JWT_SECRET=your_super_secret_jwt_key_here

# ImageKit Configuration (For Avatar Uploads)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint
```

### Running the Development Server

To start the backend server with `nodemon` (which automatically restarts the server when file changes are detected):

```bash
npm run dev
```

The server will be available at `http://localhost:3000`.

## 📂 Project Structure

```text
src/
├── config/        # Configuration files (db.js for MongoDB connection)
├── controllers/   # Business logic for all routes (auth, users, teams, tasks)
├── middleware/    # Express middleware (auth.middleware.js, roles.middleware.js)
├── models/        # Mongoose database schemas (user.model.js, team.model.js, task.model.js)
├── routes/        # Express router definitions, mapping endpoints to controllers
└── server/        # External service setups (imagekit.js)
index.js           # The main entry point that configures Express and connects to MongoDB
```

## 🔐 Authentication & Roles

The backend enforces Role-Based Access Control (RBAC). 
- **Authentication:** `verifyJWT` middleware is used to ensure a valid JWT token is passed in the `Authorization: Bearer <token>` header.
- **Authorization:** `authorizeRoles('Team Leader')` middleware is used on specific administrative routes (like fetching all users, or creating teams) to block standard 'Team Members'.

## 🌐 API Endpoints

The API is mounted on `/api` and is broken down into the following core domains:

| Route Prefix | Purpose | Example Endpoint |
|--------------|---------|------------------|
| `/api/auth`  | User registration and login. | `POST /api/auth/login` |
| `/api/user`  | User profile, settings, and team queries. | `GET /api/user/my-teams` |
| `/api/team`  | Creating and managing organizational teams. | `POST /api/team` |
| `/api/task`  | Full CRUD operations for task tracking. | `GET /api/task` |
| `/api/activity`| (Optional) Tracking organizational activity logs. | `GET /api/activity` |

Ensure that you have set the appropriate `CORS` origins in `index.js` to allow your frontend URL to successfully communicate with these endpoints.
