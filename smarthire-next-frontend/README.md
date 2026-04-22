# SmartHire Frontend (Next.js)

Frontend for the SmartHire backend API.

## Features

1. User registration (`/register`)
2. User login with JWT storage (`/login`)
3. Protected dashboard (`/dashboard`)
4. AI match scoring form connected to backend (`POST /ai/match`)

## Environment

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Default API URL:

`NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1`

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3001` if your backend is on `3000`, or update ports as needed.

## Backend Prerequisite

Make sure backend is running and reachable at your `NEXT_PUBLIC_API_BASE_URL`.
