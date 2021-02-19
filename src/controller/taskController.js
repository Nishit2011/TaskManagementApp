const Task = require("../models/task");

exports.addTask = async (req, res, next) => {
  try {
    const task = new Task({
      ...req.body,
      creator: req.user._id,
    });
    await task.populate("creator").execPopulate();
    await task.save();

    res.status(201).send(task);
  } catch (error) {
    next(error)
  }
};

exports.getTasksById = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const tasks = await Task.findOne({ _id, creator: req.user._id });

    if (!tasks) {
      return res.status(400).send("No tasks found");
    }
    res.send(tasks);
  } catch (error) {
    next(error)
  }
};

exports.editTaskById = async (req, res, error) => {
  const updates = Object.keys(req.body);
  const _id = req.params.id;
  console.log(updates);
  const allowedUpdates = ["name", "description", "isCompleted"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  console.log(isValidOperation);
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const task = await Task.findOne({ _id, creator: req.user._id });
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    next(error)
  }
};

exports.deleteTaskById = async (req, res, error) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, creator: req.user._id });
    await task.remove();
    res.status(200).send();
  } catch (error) {
    next(error)
  }
};
