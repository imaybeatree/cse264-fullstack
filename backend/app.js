import express from "express";
import { corsConfig } from "#auth/cors.js";
import { loginHandler, registerHandler } from "#auth/auth.handlers.js";
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

app.get('/', (req, res) => {
  res.send('hello world')
})
app.post("/api/auth/register", registerHandler);