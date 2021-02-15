const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth =  async (req, res, next) =>{
    try {
        const token = req.header("Authorization").replace("Bearer ","");
        const decoded = await jwt.verify(token,"nishitjwt");
        const user = await User.findOne({_id: decoded._id, "tokens.token": token})
        req.user = user;
    } catch (error) {
        res.send({error: "Please authenticate"})
    }
    next()
}

module.exports = auth;