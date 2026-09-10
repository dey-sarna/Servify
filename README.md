<div align="center">

# 🏛️ Servify

### Public Complaint Management System

A full-stack web application that provides a structured and transparent way for citizens to submit public complaints, track their progress, and communicate with responsible staff through a role-based complaint management workflow.

<br>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

---

## 📌 About Servify

**Servify** is a Public Complaint Management System developed to improve communication between citizens and responsible authorities.

Instead of relying on unstructured or manual complaint handling, Servify provides a centralized platform where citizens can submit issues, administrators can review and assign complaints, and staff members can update the progress until the issue is resolved.

The system uses **role-based access control** for three different user roles:

- 👤 Citizen
- 👨‍💼 Staff
- 🛡️ Admin

---

## ✨ Key Features

### 👤 Citizen

- Register and log in securely
- Access a personalized citizen dashboard
- Submit a new public complaint
- Select complaint category
- Provide issue description and location
- View all previously submitted complaints
- Track complaint status
- View complete complaint details
- View status update history and staff notes
- See dashboard statistics for:
  - Total complaints
  - Pending complaints
  - Complaints in progress
  - Resolved complaints

### 👨‍💼 Staff

- Secure role-based login
- Access staff-only pages
- View complaints assigned by the administrator
- View complaint information
- Update complaint status
- Change status to **In Progress** or **Resolved**
- Add notes while updating a complaint
- Maintain a complaint progress history

### 🛡️ Admin

- Access an administrative dashboard
- View total complaint statistics
- Monitor pending and resolved complaints
- View total citizens and staff members
- View all submitted complaints
- Filter complaints by status
- Filter complaints by category
- Assign complaints to staff members
- View registered users and their roles

---

## 🔄 Complaint Workflow

```text
Citizen
   │
   ▼
Submit Complaint
   │
   ▼
Pending
   │
   ▼
Admin Reviews Complaint
   │
   ▼
Assigned to Staff
   │
   ▼
Staff Starts Processing
   │
   ▼
In Progress
   │
   ▼
Staff Adds Update / Note
   │
   ▼
Resolved
```

### Complaint Status

```text
Pending → Assigned → In Progress → Resolved
```

---

## 🗂️ Complaint Categories

Servify currently supports the following complaint categories:

- 🛣️ Road
- 💧 Water
- 💡 Street Light
- 🚰 Water Supply
- 🗑️ Waste Management
- 📋 Other

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- JavaScript
- HTML5
- CSS3
- Axios
- Vite

### Backend

- Node.js
- Express.js
- REST API

### Database

- MySQL
- MySQL2

### Authentication & Security

- JSON Web Token (JWT)
- bcrypt password hashing
- Role-Based Access Control
- Protected routes
- Bearer token authentication

### Development Tools

- Git
- GitHub
- VS Code
- Postman
- npm

---

## 🏗️ System Architecture

```text
┌───────────────────────────────┐
│          React Client         │
│                               │
│  Citizen | Staff | Admin UI   │
└──────────────┬────────────────┘
               │
               │ HTTP / REST API
               │
               ▼
┌───────────────────────────────┐
│      Node.js + Express.js     │
│                               │
│ Authentication               │
│ Role Authorization           │
│ Complaint Management         │
│ Admin Management             │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│             MySQL             │
│                               │
│ Users                         │
│ Complaints                    │
│ Complaint Updates            │
└───────────────────────────────┘
```

---

## 📂 Project Structure

```text
Servify/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── role.js
│   │   │
│   │   ├── modules/
│   │   │   ├── admin/
│   │   │   │   ├── admin.controller.js
│   │   │   │   └── admin.routes.js
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.js
│   │   │   │   └── auth.routes.js
│   │   │   │
│   │   │   └── complaints/
│   │   │       ├── complaints.controller.js
│   │   │       └── complaints.routes.js
│   │   │
│   │   ├── utils/
│   │   │   └── jwt.js
│   │   │
│   │   ├── app.js
│   │   └── index.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   ├── About.jpg
│   │   ├── Hero.jpeg
│   │   └── HeroF.jpg
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NavbarPublic.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── DashboardLayout.jsx
│   │   │   └── PublicLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminComplaints.jsx
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   └── ManageUsers.jsx
│   │   │   │
│   │   │   ├── citizen/
│   │   │   │   ├── CitizenDashboard.jsx
│   │   │   │   ├── ComplaintDetails.jsx
│   │   │   │   ├── MyComplaints.jsx
│   │   │   │   └── NewComplaint.jsx
│   │   │   │
│   │   │   ├── public/
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Contact.jsx
│   │   │   │   ├── Features.jsx
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── HowItWorks.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   │
│   │   │   └── staff/
│   │   │       ├── AssignedComplaints.jsx
│   │   │       ├── StaffDashboard.jsx
│   │   │       └── UpdateStatus.jsx
│   │   │
│   │   ├── styles/
│   │   │   ├── dashboard.css
│   │   │   ├── form.css
│   │   │   ├── global.css
│   │   │   ├── home.css
│   │   │   ├── LandingPage.css
│   │   │   ├── navbar.css
│   │   │   └── static.css
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

### Structure Overview

- **frontend/** contains the React user interface.
- **backend/** contains the REST API and server-side logic.
- **modules/** separates authentication, complaint, and admin functionality.
- **middleware/** handles JWT authentication and role authorization.
- **pages/** organizes the frontend according to public, citizen, staff, and admin views.
- **context/** manages authentication state on the frontend.
- **api/** configures Axios and automatically attaches authentication tokens.

---

## 🗄️ Database Structure

The application currently works with three main database entities.

### Users

Stores registered user information and user roles.

```text
users
├── id
├── name
├── email
├── address
├── password_hash
├── role
└── created_at
```

### Complaints

Stores complaints submitted by citizens.

```text
complaints
├── id
├── citizen_id
├── title
├── description
├── category
├── location_text
├── status
├── assigned_staff_id
└── created_at
```

### Complaint Updates

Stores complaint status changes and staff notes.

```text
complaint_updates
├── id
├── complaint_id
├── updated_by
├── old_status
├── new_status
├── note
└── created_at
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate user and return JWT |

### Citizen

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/complaints/citizen/summary` | Get citizen dashboard statistics |
| `POST` | `/api/complaints` | Submit a new complaint |
| `GET` | `/api/complaints/mine` | View citizen's own complaints |
| `GET` | `/api/complaints/:id` | View complaint details and update history |

### Staff

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/complaints` | View assigned complaints |
| `GET` | `/api/complaints/:id` | View complaint details |
| `PATCH` | `/api/complaints/:id/status` | Update complaint status and add note |

### Admin

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/overview` | View admin dashboard statistics |
| `GET` | `/api/admin/complaints` | View and filter all complaints |
| `PATCH` | `/api/admin/complaints/:id/assign` | Assign complaint to staff |
| `GET` | `/api/admin/users` | View registered users |

---

## 🔐 Authentication & Authorization

Servify uses **JWT-based authentication**.

After successful login:

1. The backend generates a JWT token.
2. The frontend stores the token in local storage.
3. Axios automatically attaches the token as a Bearer token to protected API requests.
4. Backend middleware verifies the JWT.
5. Role middleware determines whether the user is authorized to access a resource.

The application currently supports:

```text
citizen
staff
admin
```

JWT tokens expire after **7 days**.

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MySQL
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/dey-sarna/Servify.git
cd Servify
```

---

### 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=servify

JWT_SECRET=your_secure_jwt_secret
```

Then start the backend:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

---

### 3. Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

---

## 🔒 Environment Variables

The backend requires the following environment variables:

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port |
| `DB_HOST` | MySQL host |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | MySQL database name |
| `JWT_SECRET` | Secret key used for JWT signing |

> **Important:** Never commit your real `.env` file or credentials to GitHub.

Add the following to your `.gitignore`:

```gitignore
node_modules/
.env
```

---

## 📸 Screenshots

> Add screenshots of the completed application here to make the repository easier to understand.

### 🏠 Landing Page

<!--
![Servify Landing Page](./screenshots/home.png)
-->

### 👤 Citizen Dashboard

<!--
![Citizen Dashboard](./screenshots/citizen-dashboard.png)
-->

### 📝 Submit Complaint

<!--
![Submit Complaint](./screenshots/new-complaint.png)
-->

### 👨‍💼 Staff Dashboard

<!--
![Staff Dashboard](./screenshots/staff-dashboard.png)
-->

### 🛡️ Admin Dashboard

<!--
![Admin Dashboard](./screenshots/admin-dashboard.png)
-->

### 📋 Complaint Management

<!--
![Complaint Management](./screenshots/manage-complaints.png)
-->

---

## 🎯 Project Objectives

Servify was developed with the following goals:

- Digitize the public complaint management process
- Provide a simple way for citizens to report community issues
- Improve transparency throughout complaint resolution
- Organize complaints through categories and status tracking
- Allow administrators to assign responsibilities efficiently
- Allow staff members to record progress and resolution updates
- Maintain a centralized history of complaints and status changes
- Demonstrate a practical full-stack role-based web application

---

## 🧠 What This Project Demonstrates

Through Servify, the project demonstrates practical implementation of:

- Full-stack web development
- REST API design
- React routing
- Client-server architecture
- MySQL database integration
- Authentication and authorization
- JWT-based protected APIs
- Role-Based Access Control
- Password hashing with bcrypt
- API integration using Axios
- Modular backend architecture
- Complaint workflow management
- Status history tracking

---

## 🚧 Future Improvements

Possible future improvements include:

- 📎 Image and document attachments with complaints
- 📍 Interactive map and GPS-based location reporting
- 🔔 Email and in-app notifications
- 🤖 AI-based complaint categorization
- ⚡ Automatic complaint priority detection
- ⏱️ SLA and resolution deadline tracking
- 💬 Citizen-support chatbot
- 🌐 Multi-language support
- 🕵️ Anonymous complaint submission
- 📊 Advanced analytics and reporting
- 🔍 Search and advanced filtering
- 📱 Mobile-responsive enhancements
- ☁️ Cloud deployment
- 🔐 Improved production-level user and staff account management

---

## 📈 Current Project Status

Servify currently includes the core complaint management workflow:

`Authentication` ✅  
`Role-Based Access` ✅  
`Citizen Dashboard` ✅  
`Complaint Submission` ✅  
`Complaint Tracking` ✅  
`Status History` ✅  
`Admin Dashboard` ✅  
`Complaint Assignment` ✅  
`Staff Status Updates` ✅  
`User Management View` ✅  

Additional advanced features are planned for future development.

---

## 👩‍💻 Author

### Sarna Dey

Computer Science & Engineering Student  
Aspiring Software Engineer | Full Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-dey--sarna-181717?style=for-the-badge&logo=github)](https://github.com/dey-sarna)

---

## ⭐ Support

If you find **Servify** useful or interesting, consider giving the repository a ⭐.
