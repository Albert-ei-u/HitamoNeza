# SmartHire Backend (NestJS)

SmartHire is a backend API for:
1. user signup and login with JWT authentication
2. protected profile access
3. AI-style candidate to job skill matching

## Stack

- NestJS
- PostgreSQL + TypeORM
- JWT + Passport
- class-validator
- bcrypt

## API Base URL

`/api/v1`

## Endpoints

1. `GET /api/v1/health`
Returns service health info.

2. `POST /api/v1/users`
Create a user account.

3. `POST /api/v1/auth/login`
Login and receive `access_token`.

4. `GET /api/v1/users/me` (Protected)
Returns current authenticated user payload.

5. `POST /api/v1/ai/match` (Protected)
Scores candidate skills against job skills.

## Example Requests

### Register
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Albert\",\"email\":\"albert@example.com\",\"password\":\"123456\"}"
```

### Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"albert@example.com\",\"password\":\"123456\"}"
```

### AI Match (Protected)
```bash
curl -X POST http://localhost:3000/api/v1/ai/match \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d "{\"jobTitle\":\"Backend Engineer\",\"jobSkills\":[\"nestjs\",\"postgres\",\"jwt\"],\"candidateSkills\":[\"nestjs\",\"jwt\"]}"
```

## Local Setup

1. Install dependencies:
```bash
npm install
```

2. Create env file:
```bash
cp .env.example .env
```
On Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

3. Run dev server:
```bash
npm run start:dev
```

4. Run tests and build:
```bash
npm run test -- --runInBand
npm run build
```

## Docker Setup

1. Prepare env file:
```bash
cp .env.example .env
```

2. Run app + postgres:
```bash
docker compose up --build
```

3. Stop containers:
```bash
docker compose down
```

## Production Notes

1. Set `DB_SYNC=false` in production.
2. Use strong `JWT_SECRET` in production.
3. Use managed Postgres and secure network rules.
4. Prefer migrations for schema changes instead of auto-sync.
