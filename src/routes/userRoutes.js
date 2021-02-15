const express = require("express");
const { addUser, getUsers, getUserById, updateUserById, deleteUserById, loginUser, getMe } = require("../controller/userController");
const router = new express.Router();

const auth = require("../middleware/auth");


router
.post('/user', addUser)
.get('/user/me', auth, getMe)
.get('/user/:id', getUserById)
.patch('/user/:id', updateUserById)
.delete('/user/:id', deleteUserById)
.post('/user/login', loginUser)

module.exports = router;