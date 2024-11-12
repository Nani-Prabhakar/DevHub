const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 4,
        maxLength: 50,
        required: true,
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 50,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        
        required: true,
    },
    password: {
        type: String,
       
        required: true,
    },
    age: {
        type: Number,
        min: 12,
        
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
       
    },
    skills:{
        type:[],
        
    },
    about:{
        type:String,
    },
    photoURL:{
        type:String,
    }

}, {
    timestamps: true
});
userSchema.methods.isValidPassword=async function(userPassword){
    const user=this;
    const b=await bcrypt.compare(userPassword,user.password);
    return b;
}
userSchema.methods.getJWT=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id},"sarru");
    return token;
}
module.exports = mongoose.model("User", userSchema);
