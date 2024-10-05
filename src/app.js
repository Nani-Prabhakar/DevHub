const express=require('express')
const connectDB=require('./config/database')
const User=require('./models/userModel')
const app=express()
connectDB().then(()=>{
    console.log("database connected successfully!!")
}).catch(err=>{
    console.log("database cannot be connected")
})
app.use(express.json())


app.post("/signup",async (req,res)=>{
    const data=req.body;
    const user =new User(data);
    try{
        await user.save();
    }catch(err){
        console.log("error in creating user:",err.message)
    }
    
    res.send("user created successfully")
})
app.listen(7777,()=>{
    console.log("server listening at port 7777")
})