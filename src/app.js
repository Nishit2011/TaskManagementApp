const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const connectDB = require("./db/mongoose");
const userRoute = require("./routes/userRoutes");
const taskRoute = require("./routes/taskRoute");
const errorHandler = require("./middleware/error");

require("colors");
connectDB();

const app = express();

//POC on middleware

// app.use((req,res,next)=>{
//     res.status(503).send("Server under maintenance!");

// })

app.use(express.json());


app.use(userRoute);
app.use(taskRoute);
app.use(errorHandler);

module.exports = app;