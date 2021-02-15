const Task = require("../models/task");
const express = require("express");
const { addTask } = require("../controller/taskController");
const router = new express.Router();

router.post('/task',addTask)

module.exports = router;