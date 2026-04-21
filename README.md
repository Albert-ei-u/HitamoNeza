# 🚀 NestJS Auth Backend

A production-ready backend built with NestJS, PostgreSQL, and JWT authentication.

## 🔥 Features
- User registration
- Secure password hashing (bcrypt)
- Login with JWT authentication
- Protected routes
- Input validation (DTOs)

## 🧱 Tech Stack
- NestJS
- PostgreSQL
- TypeORM
- JWT (Authentication)
- bcrypt (Security)

## 📌 API Endpoints

### Register
POST /users

### Login
POST /auth/login

### Get Profile (Protected)
GET /users/me

## ⚙️ Setup

```bash
npm install
npm run start:dev