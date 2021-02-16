
const User = require("../models/user");


exports.addUser = async (req, res)=>{
   
    const user = await new User(req.body);
    try {
        await user.save();
        const token = await user.getAuthToken();
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
       
}

exports.loginUser = async (req, res) =>{
 
    try {
        //We are creating a new method on User model because we want this method to be applied to the collection and not restrict it to only a single user
        const user = await User.findUserByLoginPassword(req.body.email, req.body.password);
         const token = await user.getAuthToken();
        
        res.send({user, token})
    } catch (error) {
        res.status(400).send()
    }
}

exports.logoutUser = async(req, res) =>{
    
    try {
        req.user.tokens =  await req.user.tokens.filter(token=> token.token !== req.token);
        
        await req.user.save();
        console.log(req.user)
        res.send()
        
    } catch (error) {
        res.status(500).send()
    }
  
}

exports.logoutAll = async(req, res) =>{
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }

}

exports.getMe = async (req,res)=>{
   res.send(req.user)
}

// exports.getUserById = async(req,res)=>{
//     try {
//         const user = await User.findById(req.params.id);
//         if(!user) return res.status(400).send()
//         res.status(200).send({name:user.name})
//     } catch (error) {
//         res.status(500).send()
//     }
    
// }

exports.updateUser  = async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "isIndian"];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: "Invalid updates"})
    }
    try {
        const user = await User.findById(req.user._id);
        updates.forEach((update)=>user[update] = req.body[update])
        await user.save()
       
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send()
    }
}

exports.deleteUser = async (req,res) =>{
    
    try {
        req.user.remove()
       res.status(200).send()
    
    } catch (error) {
        res.status(500).send();
    }
}
// GET //user/getTasks?isCompleted=true
// GET /user/getTasks?limit=2&skip=3
exports.getOwnTasks = async(req, res) =>{
    const match = {};
    const sort = {}
    if(req.query.isCompleted){
        match.isCompleted = req.query.isCompleted === "true"
    }
    const sortByParams = req.query.sortBy;
    // const sortByFieldName = sortByParams.split(":")[0];
    // const sortCriteria = sortByParams.split(":")[1] === "asc"? 1: -1;
    // console.log(sortByFieldName, sortCriteria)

    if(sortByParams){
        const parts = req.query.sortBy.split(":")
        sort[parts[0]] = parts[1] === "desc" ? -1 :1
    }
    
    try {
        await req.user.populate({path:'tasks', match, options:{
            limit: parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort
        }}).execPopulate();
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send()
    }
  
}