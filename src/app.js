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
app.patch("/update",async (req,res)=>{
  const id=req.body.id;
  const data=req.body;
  const user=new User;
  try{
    const user=await User.findByIdAndUpdate({_id:id},  data, {
      returnDocument:"after",
      runValidators:true,
    });
    //await doc.save();
    console.log(user)
    res.send("data updated successfully")
  }catch(err){
    console.log("error in creating user:",err.message)
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