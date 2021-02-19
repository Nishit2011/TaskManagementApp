
const app = require("./app");
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
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server is listening on ${PORT}`.bold.yellow)
);
