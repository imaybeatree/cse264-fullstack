import 'dotenv/config';
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { corsConfig } from "#auth/cors.js";
import { loginHandler, registerHandler } from "#auth/auth.handlers.js";
import { middleware, authOnly } from "#auth/middleware.js";
import userRouter from "#user/user.routes.js";
import recipeRoutes from "#recipes/recipes.routes.js";
import { sendVerificationEmailHandler, verifyEmailHandler } from "./src/mailing/mail.handlers.js";

import userRoutes from "./src/user/user.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dist")));
}

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
app.get("/api/auth/verify", verifyEmailHandler);

// auth required but unverified users allowed
app.post("/api/mail/send", authOnly, sendVerificationEmailHandler);

// SPA catch-all: serve index.html for any non-API route (before auth middleware)
if (process.env.NODE_ENV === "production") {
  app.get("*splat", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });
}

// place protected endpoints below
app.use(middleware)

// fetch api recipes
app.use("/api/user", userRouter);
app.use("/api/recipes", recipeRoutes);

app.get("/test-auth", (req, res) => {
  res.json({
    message: "You are authenticated",
    user: res.locals.user,
  });
});
