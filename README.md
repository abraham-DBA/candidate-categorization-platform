## 🧑‍💼 Candidate Management System


A full-stack **Candidate Management System** built with **React**, **Node.js**, **Express**, and **MongoDB**.
This application enables administrators to register candidates, automatically assign skill tiers based on selected skills, and manage candidate data efficiently.

## 📚 Table of Contents

## 📚 Table of Contents

- [🚀 Features](#-features)
- [🧠 Tech Stack](#-tech-stack)
- [⚙️ Installation](#-installation)
- [💻 Usage](#-usage)
- [🏅 Tier Definitions](#-tier-definitions)
- [📁 Folder Structure](#-folder-structure)
- [🔗 API Endpoints](#-api-endpoints)
- [🧩 Planned Features](#-planned-features)
- [📜 License](#-license)


## 🚀 Features

- **Add Candidate** – Register candidates with personal and skill information.

- **Automatic Tier Assignment** – Assigns a skill tier (0–4) automatically based on predefined criteria.

- **Search & Filter** – Filter candidates by name, email, or skill tier.

- **Responsive UI** – Clean, modern interface powered by Tailwind CSS.

- **Skill Assessment** – Evaluate multiple skill categories such as frontend, backend, and deployment.

- **⚠️ Authentication** is not yet implemented; all users currently have open access.

## 🧠 Tech Stack

**Frontend**: React, React Router DOM, Tailwind CSS
**Backend**: Node.js, Express
**Database**: MongoDB (Mongoose ODM)
**Others**: Fetch API / Axios, JavaScript

## ⚙️ Installation
## 1. Clone the Repository
git clone https://github.com/yourusername/candidate-management.git
cd candidate-management

## 2. Backend Setup
cd backend
npm install


Create a .env file in the backend directory:

PORT=5000
MONGODB_URI=your_mongodb_connection_string


Start the backend server:

npm run dev

## 3. Frontend Setup
cd ../frontend
npm install
npm run dev


Then open your browser at:
👉 http://localhost:5173
 (or the port provided by Vite)

## 💻 Usage

Navigate to /candidates to view all registered candidates.

Click Add Candidate to register a new candidate and select their skills.

Candidate tiers are automatically calculated and displayed in the overview table.

## 🏅 Tier Definitions
| Tier | Title | Criteria |
|:---:|:---|:---|
| 0 | Beginner | Knows HTML, CSS, JavaScript. Basic React/Next.js knowledge. Cannot build CRUD apps. |
| 1 | CRUD Developer | Can build CRUD apps with Next.js and databases. Cannot implement authentication. |
| 2 | Full-Stack Next.js | Can build authenticated CRUD apps with Next.js and deploy them. Limited backend skills. |
| 3 | Multi-Framework Developer | Can build authenticated CRUD apps and APIs using Express/Hono or Laravel. Cannot use Golang. |
| 4 | Advanced Full-Stack | Proficient in Next.js, Express/Hono, Laravel, and Golang. Can build full frontend + backend APIs. |

## 📁 Folder Structure
```text
candidate-management/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components (Tables, Forms, etc.)
│   │   ├── pages/            # Application pages (Overview, AddCandidate)
│   │   └── App.jsx
├── backend/
│   ├── models/               # Mongoose models
│   ├── routes/               # Express routes
│   ├── controllers/          # Business logic & tier calculation
│   └── server.js             # Express server entry point
└── README.md
```


## 🔗 API Endpoints
Method	Endpoint	Description
GET	/api/candidates/get-candidates	Retrieve all registered candidates
POST	/api/candidates/register-candidate	Register a new candidate and calculate tier
🧩 Planned Features

🔐 Authentication & Authorization (JWT / Clerk)

✏️ Edit and Delete functionality for candidates

🧭 Role-based access (Admin vs. Regular User)

🔔 Real-time updates and notifications for new registrations

## 📜 License

This project is licensed under the MIT License.
Feel free to use, modify, and distribute it for educational or commercial purposes.


