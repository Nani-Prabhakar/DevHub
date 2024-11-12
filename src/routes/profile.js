const express=require('express')
const profileRouter=express.Router();
const {userAuth}=require('../middlewares/auth')
const{validateEditData}=require('../utils/validate')
profileRouter.get('/profile/view',userAuth,async (req,res)=>{
    try{ 
        const user=req.user;
        res.send(user);  
    }catch(err){
      res.status(400).send("Error"+err.message)
    }
  })
profileRouter.patch('/profile/edit',userAuth,async (req,res)=>{
  try{
    if(!validateEditData(req)){
      throw new Error("invalid update");
    }
    const loggedInUser=req.user;
    Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
    await loggedInUser.save();
    res.json({message:`${loggedInUser.firstName} your profile updated`,data:loggedInUser});
  }catch(err){
    res.send("Error "+err.message);
  }

})
module.exports=profileRouter;