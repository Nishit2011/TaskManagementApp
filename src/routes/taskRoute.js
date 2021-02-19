const Task = require("../models/task");
const express = require("express");
const {
  addTask,
  getTasksById,
  editTaskById,
  deleteTaskById,
} = require("../controller/taskController");
const auth = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const router = new express.Router();

router
  .post("/task", auth, addTask)
  .get("/task/:id", auth, getTasksById)
  .patch("/task/:id", auth, editTaskById)
  .delete("/task/:id", auth, authorize("admin"), deleteTaskById);

module.exports = router;
