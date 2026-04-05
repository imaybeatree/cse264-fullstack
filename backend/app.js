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

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files in production
app.use(express.static(path.join(__dirname, "../public")));

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
  res.sendFile(path.join(__dirname, "../public/index.html"));
});