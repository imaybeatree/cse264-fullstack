import 'dotenv/config';
import express from "express";
import { corsConfig } from "#auth/cors.js";
import { loginHandler, registerHandler } from "#auth/auth.handlers.js";
import { middleware } from "#auth/middleware.js";
import { getRecipesHandler } from "#recipes/recipes.handlers.js";

const app = express();
const PORT = 3000;

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