
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

exports.getUserById = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(400).send()
        res.status(200).send({name:user.name})
    } catch (error) {
        res.status(500).send()
    }
    
}

exports.updateUserById  = async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "isIndian"];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: "Invalid updates"})
    }
    try {
        const user = await User.findById(req.params.id);
        updates.forEach((update)=>{
            user[update] = req.body[update]
        })
        await user.save()
        if(!user) return res.status(404).send();
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send()
    }
}

exports.deleteUserById = async (req,res) =>{
    console.log(req.params.id)
    try {
       const user = await User.findByIdAndDelete(req.params.id)
       if(!user){
           return res.status(404).send()
       }
       res.status(200).send(user)
    
    } catch (error) {
        res.status(500).send();
    }
}