const express=require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter=express.Router();
const USER_SAFE_DATA = "firstName lastName photoURL age gender about skills";
userRouter.get('/user/requests/received',userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",USER_SAFE_DATA);
        res.json({
            message: "Data fetched successfully",
            data: connectionRequests,
        });
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
})

userRouter.get('/user/connections',userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const connections=await ConnectionRequest.find({
            $or:[
                {fromuserId:loggedInUser._id,status:"accepted"},
                {toUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",USER_SAFE_DATA)
          .populate("toUserId",USER_SAFE_DATA)
        const data=connections.map((row)=>{
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
              }
              return row.fromUserId;
        })
        res.send({data});
    }catch(error){
        res.status(400).send("Error: "+err.message);
    }
})

module.exports=userRouter;