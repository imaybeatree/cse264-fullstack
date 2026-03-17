## Tech Stack

### Frontend

- React + Vite
- React Router

### Backend

- Express.js
- PostgreSQL

## Project Structure

```
├─ root/
│   ├─ frontend/     # React + Vite application
│   ├─ backend/      # Express.js server
│   └─ prisma/       # Database migrations and schema
```

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally)


## Development Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env` in the root directory.
   - Fill in the required environment variables

3. Start the development environment:
   ```bash
   docker-compose up -d
   npm run migrate
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start all packages in development mode
- `npm run migrate` - Run database migrations
- `npm run resetdb` - Clear database and reset migrations

