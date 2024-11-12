const User=require('../models/userModel')
const jwt=require('jsonwebtoken')
const userAuth=async (req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            throw new Error("invalid token!!!!!");
        }
        const decodedObj=await jwt.verify(token,'sarru');
        const{_id}=decodedObj;
        //console.log(_id)
        const user=await User.findOne({_id:_id});
        //console.log(user1);
        if(!user){
            throw new Error("User not found");
        }
        //console.log(user)
        req.user=user;
        next();

    }catch(err){
        res.send("Error:"+err.message);
    }
    
   
}

module.exports={
    userAuth,
}