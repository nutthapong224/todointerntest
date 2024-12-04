import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the CORS package
import { connectDB } from './models/db.js';
import todoRoutes from './routes/todoRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors()); // This enables CORS for all routes

app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/todos', todoRoutes); 
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
