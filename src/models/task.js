const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    }
})

module.exports =  mongoose.model("Task",  taskSchema);