const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        minlength:6,
        trim: true,
        validate(value){
            if(value==="password"){
                throw new Error("Password cant be password")
            }
        }
    },
    tokens: [{
        token:{
            type : String,
            required: true
        }
    }],
    isIndian:{
        type:Boolean,
        default:true
        
    }
})

//methods declared on static are available on the Model itself
userSchema.statics.findUserByLoginPassword = async (email, password) =>{
    const user = await User.findOne({email});

    if(!user) {
        throw new Error("No user found!")
    }

    const isMatch = await bcryptjs.compare(password, user.password);
   
   if(!isMatch) {
       throw new Error("Unable to login!")
   }
   return user;
}

//instance methods work on individual instance of Model/documents
userSchema.methods.getAuthToken =  async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, "nishitjwt");
    user.tokens = user.tokens.concat({token});
    await user.save()
    return token;
}

//pre methods here is called before user is saved in the database 
userSchema.pre('save', async function(next){
    const user = this

    if (user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8)
    }

    next()

})

const User = mongoose.model('User', userSchema)

module.exports = User