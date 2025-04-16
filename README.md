# Task Management App

A simple Task Management application built with **React**, **Node.js**, **Express**, and **MongoDB**.  
Users can register, log in, create tasks, filter tasks (completed/incomplete), and manage them efficiently.


## Tech Stack

- Frontend: **React.js**, **Bootstrap**
- Backend: **Node.js**, **Express.js**
- Database: **MongoDB**
- Authentication: **JWT**
- Styling: Bootstrap 5
- Environment Variables: dotenv


## Installation


```bash
git clone https://github.com/Deva52500/Task-Management-App.git
cd Task-Management-App

### 1. Install MongoDB 
Link: https://www.mongodb.com/try/download/community

### 2. Set up backend
cd backend
npm install
npm start

Create a .env file in the backend folder and add:

MONGO_URI= mongodb_connection_string
JWT_SECRET= jwt_secret_key
PORT=5000

### 3. Set up the frontend
cd frontend
npm install
npm start

Browser opens at http://localhost:3000/login
