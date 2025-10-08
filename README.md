# Ticket Manager

**Fullstack Web App** for managing technical support tickets — built with Spring Boot, React, Docker, and secured with JWT authentication.

---

## 🚀 Features

- Authentication with JWT (Login + Register)
- User roles: `USER`, `ADMIN`
- CRUD for support tickets
- REST API secured with Spring Security
- Responsive frontends with React and Angular
- Dashboard with statistics (tickets by status)
- Dockerized stack: Backend, Frontend, DB (PostgreSQL)
- GitHub Actions CI pipeline
- Unit testing: JUnit (Java), Jest (React)

---

## 🧰 Tech Stack

| Layer       | Technology                       |
|-------------|----------------------------------|
| Frontend    | React, Angular                   |
| Backend     | Spring Boot (or Quarkus)         |
| Auth        | JWT, Spring Security             |
| DB          | PostgreSQL (via Docker)          |
| DevOps      | Docker, Docker Compose, GitHub Actions |
| Testing     | JUnit, Mockito, Jest             |

---

## 🏗️ Project Structure

```
ticket-manager/
├── backend/
│   └── src/... (Spring Boot with REST API, Auth, etc.)
├── frontend-angular/
│   └── src/... (Angular UI, Auth pages, Dashboard)
├── frontend-react/
│   └── src/... (React UI, Auth pages, Dashboard)
├── docker-compose.yml
├── README.md
└── .github/workflows/ci.yml
```

---

## 📦 Setup (Local)

### Pre-requisite
- Docker & Docker Compose

### Launch the project
```bash
git clone https://github.com/tonprofil/ticket-manager.git
cd ticket-manager
docker-compose up --build
```
Access :
- Frontend : http://localhost:3000
- Backend API : http://localhost:8080/api

---

## ✅ Account examples

- user@example.com / password → USER
- admin@example.com / adminpass → ADMIN

---

## 🔍 Screenshots (To Do)

- 🧾 Tickets list
- 🔐 Login/Register
- 📊 Dashboard

---

## 📌 TODO
- Fix and test React frontend
- Fix and test Angular frontend
- Implement ticket search/filter functionality
- Implement ticket assignment to users
- Add real-time updates for ticket status/comments
- Improve error handling and user feedback
- Implement notifications for new tickets/comments
---

## 👨‍💻 Author

Eric Diallo — [LinkedIn](https://linkedin.com/in/eric-diallo-52b41b103) | [GitHub](https://github.com/idr77)
