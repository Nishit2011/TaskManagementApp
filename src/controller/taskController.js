const Task = require("../models/task");

exports.addTask = async(req, res) =>{
    try {
        const task = new Task(req.body);
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send()
    }
}

