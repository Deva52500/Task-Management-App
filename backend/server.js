import express from 'express'
import cors from 'cors'
import connectDB from './db/db.js';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routes/auth.js'
import taskRouter from './routes/task.js'

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/auth', authRouter)
app.use('/api/tasks', taskRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB ()
  console.log(`Server is running on port ${PORT}`);
});