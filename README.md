# DeptSync
MERN stack system for managing department-level academic data (colleges, departments, faculty, students, and their activities).

## Architecture
- Backend: Express + Mongoose (MongoDB) in `backend/`
- Frontend: React + Vite + Tailwind in `frontend/`

## Backend Modules (API)
- Auth: login/registration with JWT (`routes/auth.routes.js`)
- Admin & Departments: colleges, departments, teachers, students (`routes/admin.routes.js`, `routes/classroom.routes.js`)
- Activities & Achievements: activity details, achievements (`routes/activityDetails.routes.js`, `routes/achievement.routes.js`)
- Research & Publications: research papers, book publications, grants (`routes/researchPaper.routes.js`, `routes/bookPublication.routes.js`, `routes/grant.routes.js`)
- Professional Service: consultancies, committees, editorial boards (`routes/consultancy.routes.js`, `routes/committee.routes.js`, `routes/editorialBoard.routes.js`)

## Frontend Modules (UI)
- Auth & landing pages (`src/pages/Login.jsx`, `Signup.jsx`, `Landing.jsx`)
- Admin dashboard: colleges, departments, teachers (`src/pages/admin/*.jsx`)
- Teacher workspace: activities, research, publications, service (`src/pages/teacher/*.jsx`)
- Student workspace: profiles and achievements (`src/pages/student/*.jsx`)

## Getting Started
1) Backend
```bash
cd backend
npm install
npm run dev   # or npm start
```

2) Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables (backend)
- `MONGO_URI` – MongoDB connection string
- `JWT_SECRET` – secret for signing tokens
- `PORT` – optional API port (defaults to 5000)



