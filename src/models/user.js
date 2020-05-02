const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:true,
            trim:true
        },
        email: {
            type:String,    
            unique:true,
            required:true,
            trim:true,
            lowercase:true,
            validate(value) {
                if(!validator.isEmail(value)) {
                    throw new Error("Invalid ")
                }
            }
        },
        age : {
            type:Number,
            default:0,
            validate(value) {
                if(value<0) {
                    throw new Error("Negative age not allowed")
                }
            }
        },
        password: {
            type:String,
            required:true,
            trim: true,
            minlength:6,
            validate(value) {
                if(value==='password') {
                    throw new Error("Password is a password")
                }
            }
        },
        tokens:[{
            token:{
                type:String,
                required:true 
            }
        }],
        avatar: {
            type:Buffer
        }
    }, {
        timestamps:true
    }
)

userSchema.virtual('tasks',{
    ref:"tasks",
    localField:'_id',
    foreignField:'owner'
})

 userSchema.methods.generateAuthToken = async function() {
     const user = this;

     const token = jwt.sign({_id: user._id.toString() },process.env.JWT_SECRET)

     user.tokens = user.tokens.concat({token})
     await user.save()
     return token
 }

 userSchema.methods.toJSON =function() {

    const user = this;
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.tokens
    delete userObj.avatar
    return userObj

 }

userSchema.statics.findByCredentials = async (email,password)=> {
    const user = await User.findOne({email:email})
    if(!user) {
        throw new Error("Unable to login")
    }

    const isMatch =await bcrypt.compare(password,user.password);
    if(!isMatch) {
        throw new Error("Unable to login")
    }

    return user

}

//hash the plain text password
userSchema.pre('save',async function(next) {

    const user = this;

    if(user.isModified("password")) {
        user.password = await bcrypt.hash(user.password,8)
    }

    next( )
})

//deletes user tasks when user is removed

userSchema.pre("remove", async function(next) {

    const user = this;

    await Task.deleteMany({owner:user._id})

    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User   
