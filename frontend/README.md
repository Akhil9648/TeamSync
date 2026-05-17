# WorkFlow - Frontend 🎨

This directory contains the React-based frontend application for the WorkFlow (TeamSync) platform. It provides the user interface for both Team Leaders (Admins) and Team Members to manage teams, track tasks, and monitor activity.

## 🛠️ Technology Stack

- **React 19:** Component-based UI library.
- **Vite:** Next-generation frontend tooling for ultra-fast builds and HMR (Hot Module Replacement).
- **Tailwind CSS v4:** Utility-first CSS framework for rapid and responsive UI development.
- **React Router v7:** Client-side routing for navigating between dashboards, profile pages, and settings.
- **Recharts:** Composable charting library for building the analytical dashboards.
- **Lucide React:** Beautiful and consistent iconography.
- **Axios:** Promise-based HTTP client for making API requests to the backend.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root of the `frontend` directory. You will need to define the URL of your backend API:

```env
# The base URL of your backend API server.
# For local development, this is typically http://localhost:3000
VITE_API_URL=http://localhost:3000
```

### Running the Development Server

To start the Vite development server with Hot Module Replacement:

```bash
npm run dev
```

The application will typically be available at `http://localhost:5173/`. 
*(Note: If port 5173 is in use, Vite will automatically try the next available port, e.g., 5174).*

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate a `dist` folder containing the minified and bundled static assets ready for deployment on platforms like Vercel, Netlify, or AWS S3.

To preview your production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```text
src/
├── auth/          # Authentication components (Login, Registration flows)
├── components/    # Reusable UI components (Buttons, Modals, Cards)
├── config/        # Global configurations (e.g., API_BASE url setup)
├── pages/         # Top-level page views (AdminPanel, Dashboard, Profile, Teams, etc.)
├── routes/        # React Router mapping (AppRoutes.jsx)
├── App.css        # Global CSS and custom Tailwind layers
├── App.jsx        # Main application root component
└── main.jsx       # React DOM rendering entry point
```

## 🧩 Key Features

- **Dynamic Role-Based Routing:** The application intelligently routes users based on their authentication status and roles. 
- **Modern UI/UX:** Features glassmorphism effects, dynamic background gradients, and smooth hover animations.
- **Responsive Design:** Fully responsive layouts ensuring the application is usable on mobile, tablet, and desktop screens.
- **Image Upload Previews:** Utilizes file readers to preview avatars before uploading them to the server via ImageKit.
