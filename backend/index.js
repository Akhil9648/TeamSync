import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import Userrouter from './src/routes/user.routes.js';
import teamRouter from './src/routes/team.routes.js';
import taskRouter from './src/routes/task.routes.js';
import activityRouter from './src/routes/activity.routes.js';

dotenv.config();

const app = express();
const corsOptions = {
  origin: '*',
  credentials: true   
};

const PORT = process.env.PORT || 3000;

connectDB();

// FIX: Increase payload size limit for Base64 images
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS
app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/user',Userrouter);
app.use('/api/team',teamRouter);
app.use('/api/task',taskRouter);
app.use('/api/activity',activityRouter);
// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
