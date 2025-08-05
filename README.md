# Ticket Manager

**Fullstack Web App** for managing technical support tickets — built with Spring Boot, React, Docker, and secured with JWT authentication.

---

## 🚀 Features

- Authentication with JWT (Login + Register)
- User roles: `USER`, `ADMIN`
- CRUD for support tickets
- REST API secured with Spring Security
- Responsive frontend with React (or Angular)
- Dashboard with statistics (tickets by status)
- Dockerized stack: Backend, Frontend, DB (PostgreSQL)
- GitHub Actions CI pipeline
- Unit testing: JUnit (Java), Jest (React)

---

## 🧰 Tech Stack

| Layer       | Technology                      |
|-------------|----------------------------------|
| Frontend    | React (or Angular), Chart.js     |
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

## 🌐 Deployment Guide

### 🔷 Render (Backend Java)
1. Crée un service Web → connecte le repo GitHub → choisis `backend/`
2. Définis la commande de build :
```bash
./mvnw clean install
```
3. Commande de start :
```bash
java -jar target/*.jar
```
4. Ajoute les variables d’env. dans Render :
- `JWT_SECRET`
- `SPRING_DATASOURCE_URL`, etc.

### 🔶 Railway (PostgreSQL)
1. Crée un projet PostgreSQL
2. Copie les identifiants dans `application.yml`
3. Laisse Render accéder à Railway

### ⚪ Vercel (Frontend React)
1. Connecte le dossier `frontend/`
2. Dans `.env`, configure :
```env
REACT_APP_API_URL=https://<render-backend-url>/api
```
3. Déploie. Le front pointera sur l’API sécurisée.

---

## ✅ Account examples

- user@example.com / password → USER
- admin@example.com / adminpass → ADMIN

---

## 🔍 Screenshots

- 🧾 Tickets list
- 🔐 Login/Register
- 📊 Dashboard

---

## 📌 TODO


---

## 👨‍💻 Author

Eric Diallo — [LinkedIn](https://linkedin.com/in/eric-diallo-52b41b103) | [GitHub](https://github.com/idr77)
