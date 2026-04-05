## Application Overview
QuickBites would be a recipe discovery platform that uses the Spoonacular API to generate meal suggestions based on user preferences, allergies, and available ingredients. Users can search for recipes by ingredients, preparation time, and meal type (i.e. breakfast, lunch, or dinner). The platform would support user accounts, where dietary preferences and allergy information are stored and used to automatically filter out recipes. 


## Team Members
- Ryan Teo (fullstack / backend lead)
- Selena Ramirez (API integration, data fetching logic)
- Leo Carle (frontend development)


## Application Functionality
- User accounts with stored preferences and allergy filtering
- Database (MySQL via Prisma) for user data, saved recipes, and preferences
- Interactive UI with dynamic search, filtering, and personalized results
- Internal REST API (Node.js/Express) for authentication and data handling
- External API integration using Spoonacular for recipe data
- Use of new libraries such as Motion (UI animations)


## Tech Stack

### Frontend

- React + Vite
- React Router

### Backend

- Express.js
- MySql

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
- MySQL (if running locally)


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

