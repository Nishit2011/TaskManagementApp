const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorResponse = require("../utils/ErrorResponse");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new ErrorResponse("Unauthorized. Please authenticate", 401))
  }
};

module.exports = authenticate;
