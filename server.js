const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const connectDB = require("./src/db/mongoose");
const userRoute = require("./src/routes/userRoutes")
const taskRoute = require("./src/routes/taskRoute");


require("colors")
connectDB();

const app = express();

//POC on middleware

// app.use((req,res,next)=>{
//     res.status(503).send("Server under maintenance!");
   
// })

app.use(express.json());



app.use(userRoute);
app.use(taskRoute);

// Hash Fn POC

// const hashFn = async () =>{
//     const password = "Nishit123";
//     const hashedPassword = await bcryptjs.hash(password, 8);
//     console.log(password);
//     console.log(hashedPassword);
//     const isMatch = await bcryptjs.compare('Nishit123', hashedPassword);
//     console.log(isMatch)
// }
// hashFn();

// POC on JWT verification
// const jwtFn = () =>{
//     //jwt sign method takes  args, a unique identifier for user and  a signature and expiry time duration 
//     const token = jwt.sign({_id: "xyz789"}, "nishittests", {expiresIn: "12000ms"});
   

//     //verify method takes token and signature to verify correct match
//     const isMatch = jwt.verify(token, "nishittests");
//     // console.log(isMatch)
// }

// jwtFn();
app.use("/",(req,res)=>{
    res.json({message:"Server is up!!!"})
});
app.listen(3000, ()=>console.log(`Server is listening on ${3000}`.bold.yellow))