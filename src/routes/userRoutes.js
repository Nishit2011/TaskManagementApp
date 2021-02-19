const express = require("express");
const {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
  logoutUser,
  logoutAll,
  getOwnTasks,
 
} = require("../controller/userController");
const router = new express.Router();

const auth = require("../middleware/auth");

router
  .post("/user", addUser)
  .get("/user/me", auth, getMe)
  .patch("/user/me", auth, updateUser)
  .delete("/user/me", auth, deleteUser)
  .post("/user/login", loginUser)
  .post("/user/me/logout", auth, logoutUser)
  .post("/user/logoutAll", auth, logoutAll)
  .get("/user/getTasks", auth, getOwnTasks)
  

module.exports = router;
