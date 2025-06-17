# Monorepo Todo Application

A simple monorepo project featuring a Next.js frontend and NestJS backend.

## Project Structure

```
Monoreppo-Project/
├── ui/                 # Next.js frontend
├── server/            # NestJS backend
└── package.json      # Root package.json for managing the monorepo
```

## Features

- Next.js frontend with Tailwind CSS
- NestJS backend with RESTful API
- Monorepo structure using npm workspaces
- Todo CRUD operations

## Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Monoreppo-Project
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

You can run both frontend and backend with a single command:

```bash
npm run dev
```

Or run them separately:

- Frontend only:
```bash
npm run dev:ui
```

- Backend only:
```bash
npm run dev:server
```

## Available Scripts

- `npm run dev` - Run both frontend and backend in development mode
- `npm run dev:ui` - Run frontend only
- `npm run dev:server` - Run backend only
- `npm run build:ui` - Build frontend
- `npm run build:server` - Build backend
- `npm run start:ui` - Start frontend in production mode
- `npm run start:server` - Start backend in production mode

## API Endpoints

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update a todo's status

## Frontend

The frontend runs on http://localhost:3000 and includes:
- Modern UI with Tailwind CSS
- Real-time updates
- Responsive design

## Backend

The backend runs on http://localhost:3001 and provides:
- RESTful API endpoints
- In-memory todo storage
- CORS enabled for frontend access 