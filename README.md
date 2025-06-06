 Dev Tinder - Backend API

A backend-only project for a **developer connection platform** like "Tinder for Devs", where developers can discover, connect, and collaborate based on their interests and skills. Built using **Node.js**, **Express.js**, and **MongoDB**.

## 🚀 Features

- 👨‍💻 User Authentication (Signup, Login, Logout)
- 📝 View & Update Profile
- 🔒 Change Password
- 📬 Send, Accept, Reject Connection Requests
- 🤝 View Connected Developers
- 📰 Developer Feed based on connections

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT-based auth
- **Validation:** Express Validator / Custom middleware
- **Environment Config:** dotenv

## 📁 Project Structure

```bash
dev-tinder-backend/
├── controllers/       # Route handler logic
├── models/            # Mongoose models
├── routes/            # API route definitions
├── middleware/        # Authentication & validation middleware
├── config/            # Database connection
├── .env               # Environment variables
├── server.js          # Entry point
└── package.json       # Project metadata & dependencies

```
API Endpoints

Auth   
POST /api/auth/signup – Register a new developer   
POST /api/auth/login – Log in
POST /api/auth/logout – Log out    

Profile   
GET /api/profile/me – View own profile     
PUT /api/profile/update – Update profile   
PUT /api/profile/password – Change password    

Connections
POST /api/connection/send/:id – Send connection request    
PUT /api/connection/accept/:id – Accept request   
PUT /api/connection/reject/:id – Reject request     
GET /api/connection/list – View all connections     

Feed  
GET /api/feed – View posts or updates from connections (placeholder for future enhancement)

Prerequisites :   
     Node.js    
     MongoDB (local or MongoDB Atlas)    
     
Installation   
    git clone https://github.com/yourusername/devTinder.git    
    cd devTinder  
    npm install    

eate a .env file in the root with the following:    
  PORT=5000   
  MONGO_URI=your_mongodb_connection_string          
  JWT_SECRET=your_jwt_secret   

run the server       
  npm start   

