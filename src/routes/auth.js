const express=require('express')
const authRouter=express.Router();
const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const {validateSignInData}=require('../utils/validate')
authRouter.post("/signup",async (req,res)=>{
    //validate signin data
    
    try{
      validateData(req);
      const {firstName,lastName,email,password}=req.body;
      const encryptedPassword=await bcrypt.hash(password,10);
      const user =new User({
        firstName,
        lastName,
        email,
        password:encryptedPassword
  
      });
      await user.save();
      res.send("user created successfully")
    }catch(err){

        res.send("error in creating user:"+err.message)
    }
    
   
})
authRouter.post("/login",async (req,res)=>{
    //validation
    try{
      const {email,password}=req.body;
      const user=await User.findOne({email:email})
      if(!user){
        throw new Error("Invalid Credentials");
      }
      const isValidPassword=await user.isValidPassword(password);
      if(!isValidPassword){
        throw new Error("password is not correct");
      }
      const token=await user.getJWT();
     res.cookie('token',token);
     res.send("login successfull");
      
   }catch(err){
     res.status(400).send("Error"+err.message);
   }
  
})
authRouter.post("/logout",async(req,res)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
  })
  res.send("logout successfull")
})
  
module.exports=authRouter;