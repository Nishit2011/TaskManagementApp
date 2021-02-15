const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async() => {
    const conn = await mongoose.connect('mongodb://localhost:27017/task-app',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    
});
console.log(`MongoDB connected ${conn.connection.host}`.bold.cyan)
}

module.exports = connectDB;
