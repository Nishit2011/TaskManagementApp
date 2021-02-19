const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  console.log(process.env.MONGO_DB_URL)
  const conn = await mongoose.connect(process.env.MONGO_DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB connected ${conn.connection.host}`.bold.cyan);
};

module.exports = connectDB;
