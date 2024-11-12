const express=require('express')
const requestRouter=express.Router();
const {userAuth}=require('../middlewares/auth')
requestRouter.post('/sendConnectionRequest',userAuth,async(req,res)=>{
    try{
      const user=req.user;
      res.send("connection request send by"+user.firstName);
    }catch(err){
      res.send("ERROR:"+err.message);
    }
  })

module.exports=requestRouter;