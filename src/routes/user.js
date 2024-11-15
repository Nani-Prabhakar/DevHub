const express=require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/userModel');
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

userRouter.get('/feed',userAuth,async (req,res)=>{
    try{
        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10
        limit=limit>50?50:limit;
        const skip=(page-1)*limit;
        const loggedInUser=req.user;
        const userConnections=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId");
        const hideUsersFromFeed=new Set();
        userConnections.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString())
        })
        const users=await User.find({
            $and:[
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } },
            ]
        }).select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);
        res.json({data:users});

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
})
module.exports=userRouter;