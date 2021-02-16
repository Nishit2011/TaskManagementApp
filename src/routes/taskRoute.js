const Task = require("../models/task");
const express = require("express");
const { addTask, getTasksById, editTaskById, deleteTaskById } = require("../controller/taskController");
const auth = require("../middleware/auth");
const router = new express.Router();

router
.post('/task',auth, addTask)
.get('/task/:id', auth, getTasksById)
.patch('/task/:id', auth, editTaskById)
.delete('/task/:id', auth, deleteTaskById)

module.exports = router;