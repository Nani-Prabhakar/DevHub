const express=require('express')
const connectDB=require('./config/database')
const User=require('./models/userModel')
const app=express()

app.use(express.json())

app.get("/user",async(req,res)=>{
    const emailID=req.body.email;
    try{
      const user =await User.findOne({email:emailID})
      if(!user){
        res.status(404).send("user not found")
      }else {
        res.status(200).send(user)
      }
    }catch(err){
        res.status(404).send("user not found")
    }
   
    
})
app.post("/signup",async (req,res)=>{
    const data=req.body;
    const user =new User(data);
    try{
        await user.save();
    }catch(err){

        res.send("error in creating user:"+err.message)
    }
    
    res.send("user created successfully")
})
app.patch("/update/:userId",async (req,res)=>{
  const id=req.params.userId;
  const data=req.body;
  try{
    const valid_updates=["firstName","lastName","age","gender"]
    const isValidUpdate=Object.keys(data).every((k)=>{
      return valid_updates.includes(k)
    })
    if(!isValidUpdate){
      throw new Error("update not allowed")
    }
    const user=await User.findByIdAndUpdate({_id:id},  data, {
      returnDocument:"after",
      runValidators:true,
    });
    res.send("data updated successfully")
  }catch(err){
    res.send("Invalid Update:"+err.message)
  }
  

})

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });