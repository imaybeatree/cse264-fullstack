import 'dotenv/config';
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { corsConfig } from "#auth/cors.js";
import { loginHandler, registerHandler } from "#auth/auth.handlers.js";
import { middleware } from "#auth/middleware.js";
import { getRecipesHandler } from "#recipes/recipes.handlers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("ENV check:", {
  DATABASE_URL: process.env.DATABASE_URL ? "set" : "MISSING",
  DB_HOST: process.env.DB_HOST || "MISSING",
  DB_PORT: process.env.DB_PORT || "MISSING",
  DB_USER: process.env.DB_USER || "MISSING",
  DB_PASSWORD: process.env.DB_PASSWORD ? "set" : "MISSING",
  DB_NAME: process.env.DB_NAME || "MISSING",
  JWT_SECRET: process.env.JWT_SECRET ? "set" : "MISSING",
  PORT: process.env.PORT || "MISSING (using 3000)",
});

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files in production
app.use(express.static(path.join(__dirname, "../dist")));

app.listen(PORT, (error) =>{
    if(!error)
        console.log("App is listening on port "+ PORT);
    else
        console.log("Error occurred, server can't start", error);
    }
);

app.use(corsConfig());

app.use(express.json()); // for parsing application/json

app.post("/api/auth/register", registerHandler);
app.post("/api/auth/login", loginHandler)

// place protected endpoints below
// app.use(middleware)

// fetch api recipes
app.get("/api/recipes", getRecipesHandler);

app.get("/test-auth", (req, res) => {
  res.json({
    message: "You are authenticated",
    user: res.locals.user,
  });
});

// SPA catch-all: serve index.html for any non-API route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});