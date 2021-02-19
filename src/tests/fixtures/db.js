const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "Test User",
  email: "test@gmail.com",
  password: "test1234",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, "nishitjwt"),
    },
  ],
};

const setupDatabase = async () =>{
  
    await User.deleteMany();
    await new User(userOne).save();
}

module.exports = {userOneId, userOne , setupDatabase}