

# University Course Registration & Assignment System

A **full-stack MERN (MongoDB, Express, React, Node.js)** application for **course registration, assignment, result management, and university administration**.



## Repositories

| Part       | Technology         | Link |
|-----------|--------------------|------|
| **Frontend** | React + Vite       | [GitHub](https://github.com/Binoy-Barman/University-Course-Registration-System) |
| **Backend**  | Node.js + Express + Mongoose | [GitHub](https://github.com/Binoy-Barman/University-Course-Assign-Backend) |

---

## Features

- **Student Portal**: Register, login, view courses, register for courses, view results
- **Teacher Portal**: View assigned courses, upload results
- **Admin Panel**: Manage departments, courses, teachers, students, notices
- **Advisor System**: Course approval workflow
- **Notice Board**: Real-time announcements
- **JWT Authentication** with role-based access
- **Responsive UI** with modern design

---

## Tech Stack

| Layer       | Technology                          |
|------------|-------------------------------------|
| Frontend   | React, Vite, Tailwind CSS (or CSS)  |
| Backend    | Node.js, Express, Mongoose          |
| Database   | MongoDB                             |
| Auth       | JWT, bcryptjs                       |
| Dev Tools  | Nodemon, ESLint, Prettier           |

---

## Project Structure

### Frontend (`University-Course-Registration-System`)
```
src/
├── components/
│   ├── Footer.jsx
│   └── Navbar.jsx
├── pages/
│   ├── AdminCourse.jsx
│   ├── AdminDepartment.jsx
│   ├── AdminLogin.jsx
│   ├── AdminNotice.jsx
│   ├── AdminTeacher.jsx
│   ├── Advisor.jsx
│   ├── AdvisorLogin.jsx
│   ├── AdvisorRegistration.jsx
│   ├── Department.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Notice.jsx
│   ├── StudentDashboard.jsx
│   ├── StudentRegistration.jsx
│   ├── Teacher.jsx
│   └── TeacherLogin.jsx
├── App.jsx
├── main.jsx
├── index.html
└── vite.config.js
```

### Backend (`University-Course-Assign-Backend`)
```
src/
├── controllers/   → Business logic
├── models/        → Mongoose schemas
├── routes/        → API endpoints
├── app.js
├── index.js
└── .env
```

---

## Installation & Setup

### 1. Clone Both Repositories

```bash
# Frontend
git clone https://github.com/Binoy-Barman/University-Course-Registration-System.git
cd University-Course-Registration-System
npm install
npm run dev

# Backend (in a new terminal)
git clone https://github.com/Binoy-Barman/University-Course-Assign-Backend.git
cd University-Course-Assign-Backend
npm install
```

### 2. Setup Environment Variables

#### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/university_db
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your_strong_jwt_secret_here
```

#### Frontend `.env` (in frontend root)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Run the Application

### Start Backend
```bash
cd University-Course-Assign-Backend
npm run dev
```
> API runs on: `http://localhost:5000`

### Start Frontend
```bash
cd University-Course-Registration-System
npm run dev
```
> App runs on: `http://localhost:5173`

---

## API Endpoints (Backend)

| Method | Endpoint                     | Description                     |
|--------|------------------------------|---------------------------------|
| GET    | `/`                          | Health check                    |
| POST   | `/api/auth/login`            | Login (Student/Teacher/Admin)   |
| POST   | `/api/students/register`     | Student registration            |
| GET    | `/api/courses`               | List all courses                |
| POST   | `/api/registrations`         | Register for a course           |
| GET    | `/api/notices`               | Get all notices                 |
| POST   | `/api/results`               | Submit result (Teacher)         |

---

## Scripts

### Frontend
```json
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
```

### Backend
```json
"dev": "nodemon src/index.js",
"start": "node src/index.js"
```

---

## Environment Variables

| Variable         | Description                            | Example |
|------------------|----------------------------------------|---------|
| `MONGODB_URI`    | MongoDB connection                     | `mongodb://localhost:27017/university_db` |
| `JWT_SECRET`     | JWT signing secret                     | `supersecretkey123` |
| `CORS_ORIGIN`    | Frontend origin                        | `http://localhost:5173` |
| `VITE_API_URL`   | Backend API base URL (Frontend)        | `http://localhost:5000/api` |

---

## Deployment (Recommended)

| Platform     | Use Case        |
|-------------|-----------------|
| **Frontend** | [Vercel](https://vercel.com) / [Netlify](https://netlify.com) |
| **Backend**  | [Render](https://render.com) / [Railway](https://railway.app) |

> Add `MONGO_URI` and `JWT_SECRET` in production environment settings.

---

## Contributing

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/new-login-ui
   ```
3. Commit your changes
   ```bash
   git commit -m "Add: new login UI with validation"
   ```
4. Push and open a Pull Request

---

## License

This project is licensed under the **ISC License**.

---

## Author

**Binoy Barman**  
GitHub: [@Binoy-Barman](https://github.com/Binoy-Barman)  
Email: bbinoy318@gmail.com

---



---

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-success)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express-5-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6-brightgreen)
![JWT](https://img.shields.io/badge/JWT-Auth-red)

---
