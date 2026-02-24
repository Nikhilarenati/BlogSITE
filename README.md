# BlogSITE - Full Stack MERN Blog Application

A modern, responsive blog platform built using the MERN stack. This application allows users to create, read, update, and delete blog posts, featuring an intelligent search system and a sleek UI.

## 🚀 Features

- **Full CRUD Functionality:** Users can create, view, edit, and delete blog posts.
- **Intelligent Search:** Advanced search logic allowing users to find blogs by **Title** or **Tags**.
- **Responsive UI:** Built with **Material UI (MUI)** for a seamless experience across desktop and mobile.
- **Image Uploads:** Support for base64 image strings using `react-file-base64`.
- **Backend API:** Robust RESTful API built with Node.js and Express.
- **Database:** NoSQL storage using MongoDB Atlas.

## 🛠️ Tech Stack

**Frontend:**
- React.js (v19)
- Material UI
- Axios
- React Router DOM

**Backend:**
- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- CORS

## 📂 Project Structure

```text
BLOG APPLICATION/
├── client/          # React frontend
│   ├── src/         # UI Components and Logic
│   └── vercel.json  # Deployment config
├── server/          # Node.js backend
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API endpoints
│   └── vercel.json  # Deployment config
└── README.md
