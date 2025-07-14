# Eventocrat Frontend

A sleek, modern React.js frontend for Eventocrat — a platform connecting college events and sponsors. This app allows students/societies to list events and send sponsor proposals to companies, while companies can list their sponsorship interest and browse events.

## 🚀 Live Demo

👉 [https://eventocrat.vercel.app/](https://eventocrat.vercel.app/)

## 🛠️ Tech Stack

- React.js
- TailwindCSS
- Firebase (Auth + Firestore)
- Vercel (Deployment)
- Google Gemini API (via backend)
- Nodemailer (via backend)

## 📁 Folder Structure

src/
│
├── pages/ # All main pages (dashboard, login, signup, etc.)
├── components/ # Reusable UI components (Navbar, ProtectedRoute, etc.)
├── lib/ # Firebase and Gemini utilities
├── App.js # Main app routing
└── index.js # App entry point


## 🔐 Environment Variables

Create a `.env` file at the root with the following:

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_BACKEND_URL=https://eventocrat-backend.onrender.com


> Make sure the `REACT_APP_BACKEND_URL` matches your deployed backend URL on Render.

## 📦 Installation

```bash
git clone https://github.com/Gyanvir/eventocrat-frontend.git
cd eventocrat-frontend
npm install
npm start
```

## ✨ Features
- Role-based login for Students and Companies
- Firebase Auth and Firestore integration
- Generate sponsor pitch via Gemini API
- Send proposal emails via backend SMTP
- Clean, responsive UI
