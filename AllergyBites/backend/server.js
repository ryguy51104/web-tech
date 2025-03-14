// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

connectDB();


const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Allow JSON data in the request body
app.use(express.json());

// Use the routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
