# DeptSync 🎓
### Unified Department & Research Management System

**DeptSync** is a robust, full-stack platform designed to streamline academic department operations. It serves as a centralized hub for tracking research contributions, managing academic projects, and automating approval workflows between students, faculty, and administrators.

---

## 🚀 Key Features

### 👤 User Roles
*   **Students**: Manage profiles, join classrooms, and submit research contributions (Journals, Patents, Projects, etc.).
*   **Teachers / Coordinators**: Review and approve student submissions, track department-wide research, and manage classrooms.
*   **Admins**: Comprehensive overview of department performance, user management, and global data analytics.

### 📚 Research & Contribution Tracking
Detailed modules for tracking and approving:
*   **Journal Publications**: Support for Scopus, IEEE, and UGC Care indexing.
*   **Patents & Copyrights**: Tracking from filing to grant stage.
*   **Academic Projects**: Management of Major, Mini, and Research projects.
*   **Grants & Consultancies**: Professional expertise and funding tracking.
*   **Conference Papers & Book Chapters**: Full academic portfolio management.

### 🛠️ Core Functionality
*   **Approval Workflow**: Real-time status tracking (Pending, Approved, Rejected).
*   **Analytics Dashboard**: Visual representation of research impact and contributions.
*   **Digital Repository**: Centralized storage for supporting documents and proofs.
*   **Responsive UI**: Modern, high-performance interface built with React and Tailwind CSS.

---

## 💻 Tech Stack

*   **Frontend**: React.js, Vite, Tailwind CSS, Axios.
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB with Mongoose ODM.
*   **Authentication**: JWT (JSON Web Tokens) with secure password hashing.
*   **Infrastructure**: Environment-based configuration with `dotenv`.

---

## 🛠️ Installation & Setup

### Prerequisites
*   Node.js (v18 or higher)
*   MongoDB (Local or Atlas)
*   npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/NileshJadhav1312/DeptSync.git
cd DeptSync
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Run the frontend:
```bash
npm run dev
```

---

## 📁 Project Structure

```text
DeptSync/
├── backend/
│   ├── controllers/    # Business logic for all modules
│   ├── models/         # Mongoose schemas (Student, Teacher, Journal, etc.)
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth and error handling
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Student, Teacher, and Admin dashboards
│   │   ├── services/   # API communication (Axios)
│   │   ├── context/    # Global state (Auth)
│   │   └── App.jsx     # Main routing
└── document.md         # Comprehensive SE documentation
```

---

## 🤝 Contributing
Contributions are welcome! Please follow the standard fork-and-pull-request workflow.

## 📄 License
This project is licensed under the MIT License.

---
*Developed for efficient academic research tracking and department synchronization.*
