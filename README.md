# 🎓 MediQueue – Tutor Booking System

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Express.js-5-000000?logo=express" />
  <img src="https://img.shields.io/badge/MongoDB%20Atlas-Database-47A248?logo=mongodb" />
  <img src="https://img.shields.io/badge/Better%20Auth-Authentication-blue" />
  <img src="https://img.shields.io/badge/JWT-Secure%20API-red" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css" />
</p>

<p align="center">
A modern Tutor Booking Platform built with <strong>Next.js, Better Auth, Express.js, MongoDB Atlas, and JWT</strong>.
</p>

---

# 🌐 Live Demo

### 🚀 Live Website

https://mediqueue-client-delta.vercel.app/

### ⚡ Server API

https://mediqueue-server-vgar.onrender.com/

---

# 📖 Project Overview

**MediQueue** is a full-stack tutor booking platform that helps students discover tutors, view tutor details, and reserve learning sessions online.

Tutors can publish their availability while students can securely book sessions without scheduling conflicts. The application uses **Better Auth** for authentication and **JWT** to secure private API routes, ensuring a safe and seamless user experience.

---

# ✨ Key Features

- 🔐 Secure authentication using **Better Auth** (Email/Password & Google Sign-In)
- 🔑 JWT-based authorization for protected API routes
- 👨‍🏫 Tutors can create, update, and delete their own tutor listings
- 📚 Students can browse tutors and book learning sessions
- 📉 Automatically decreases available slots after each successful booking
- 🚫 Prevents booking when no slots remain
- 📅 Booking is restricted until the tutor's session date arrives
- 🔍 Search tutors by name using MongoDB Regex search
- 📆 Filter tutors by registration date
- 🌙 Dark / Light theme support
- 🔔 Beautiful toast notifications for all CRUD operations
- ⚡ Responsive design for Mobile, Tablet, and Desktop
- ⏳ Loading spinner, custom 404 page, and dynamic page titles

---

# 🛠️ Tech Stack

## Frontend

- Next.js 16
- React 19
- Tailwind CSS v4
- HeroUI
- Better Auth Client
- Axios
- React Hot Toast
- React DatePicker
- React Icons
- Framer Motion
- Swiper.js

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Better Auth
- MongoDB Adapter
- JWT (jsonwebtoken)
- JOSE
- Cookie Parser
- CORS
- dotenv

---

# 🔒 Authentication & Security

- Better Auth Authentication
- Email & Password Login
- Google Login
- JWT Token Generation
- Protected Routes
- Secure Cookie Authentication
- Persistent User Session

---

# 📄 Main Pages

- 🏠 Home
- 📚 Tutors
- 👨‍🏫 Tutor Details
- ➕ Add Tutor
- 📋 My Tutors
- 📖 My Booked Sessions
- 👤 Profile
- 🔑 Login
- 📝 Register
- ❌ 404 Not Found

---

# ⚙️ Installation

## Clone Client

```bash
git clone https://github.com/your-username/mediqueue-client.git
```

```bash
cd mediqueue-client
```

```bash
npm install
```

```bash
npm run dev
```

---

## Clone Server

```bash
git clone https://github.com/your-username/mediqueue-server.git
```

```bash
cd mediqueue-server
```

```bash
npm install
```

```bash
npm run dev
```

---

# 🔑 Environment Variables

## Client (.env.local)

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

NEXT_PUBLIC_CLIENT_URL=http://localhost:3000

```

---

## Server (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_atlas_uri

BETTER_AUTH_SECRET=your_secret

BETTER_AUTH_URL=http://localhost:5000

JWT_SECRET=your_jwt_secret

```

---

# 🚀 Deployment

### Client

- Vercel

### Server

- Render

### Database

- MongoDB Atlas

---

# 📦 NPM Packages Used

### Client

- Next.js
- React
- Better Auth
- HeroUI
- Axios
- Swiper
- Framer Motion
- React Hot Toast
- React DatePicker

### Server

- Express.js
- MongoDB
- Better Auth
- Mongo Adapter
- jsonwebtoken
- jose
- cookie-parser
- cors
- dotenv

---

# 📂 Repositories

### Client Repository

https://github.com/your-github-username/mediqueue-client

### Server Repository

https://github.com/your-github-username/mediqueue-server

---

# 👨‍💻 Developer

### Jihad Soyon

GitHub

https://github.com/jihadsoyon

Portfolio

https://jihad-soyon.netlify.app/

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
