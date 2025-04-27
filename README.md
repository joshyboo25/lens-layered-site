# 📦 Lens & Layered Designs – Backend

This is the backend server for **Lens & Layered Designs**, a photography-focused platform with secure authentication and protected user routes.

Built with **Node.js**, **Express**, and **MongoDB**, this backend handles user authentication, JWT token verification, and serves as the API layer for the frontend app.

---

## 🚀 Features

- 🔐 User Signup & Login (with hashed passwords)
- ✅ JWT-based Authentication
- 🔒 Protected Routes (via middleware)
- 🌐 CORS Enabled for frontend communication
- 📦 MongoDB integration via Mongoose

---

## 🛠 Tech Stack

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **bcryptjs** (for password hashing)
- **jsonwebtoken** (for token auth)
- **dotenv** (for env variable management)
- **Render** (for deployment)

---

## 🔧 Local Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/joshyboo25/lens-backend.git
   cd lens-backend
Install dependencies
npm install

Create a .env file in the root:
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_super_secret_key

Run the server
npm run dev  # for dev mode with nodemon
npm start     # for production

📬 API Endpoints
🔐 Auth Routes (/api/auth)
Method | Endpoint | Description
POST | /signup | Register new user
POST | /login | Authenticate & get JWT token

🔒 Protected Routes (/api/dashboard)
Method | Endpoint | Description | Auth Required
GET | /dashboard | Test token-protected route | ✅

Protected routes require the Authorization header:
Authorization: Bearer YOUR_JWT_TOKEN

🧪 Sample Response
json
Copy
Edit

{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "660f1b79c7e9ae0f0f3c1c20",
    "username": "exampleUser",
    "email": "example@email.com"
  }
}

🧠 Future Plans
Add role-based permissions (e.g. admin vs user)

Connect to full product/shop system

Add user profiles and dashboard data


🔗 Deployment
This backend is deployed via Render:

Live API URL:
https://lens-backend-uh36.onrender.com

🙌 Author
Built by Josh Collins
GitHub: @joshyboo25
Project: Lens & Layered Designs



## 🔒 License

This project is **not open source** and is protected under **All Rights Reserved**.

You may not copy, distribute, or use any part of this backend code without **explicit written permission** from the project owner.

© 2025 Josh Collins. All rights reserved.
