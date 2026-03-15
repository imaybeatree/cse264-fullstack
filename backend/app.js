import express from "express";
const app = express();
const PORT = 3000;

app.listen(PORT, (error) =>{
    if(!error)
        console.log("App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);

app.get('/hello', (req, res) => {
  res.send('hello world')
})