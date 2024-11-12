const express=require('express')
const connectDB=require('./config/database')
const User=require('./models/userModel')
const app=express()
const {validateData}=require('./utils/validateSigninData')
const bcrypt=require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
app.use(express.json())
app.use(cookieParser());
const {userAuth}=require('./middlewares/auth')

app.post("/signup",async (req,res)=>{
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
app.post("/login",async (req,res)=>{
  //validation
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email:email})
    if(!user){
      throw new Error("Invalid Credentials");
    }
    const isValidPassword=await user.isValidPassword(password);
    if(isValidPassword){
      const token=await user.getJWT();
      res.cookie('token',token);
      res.send("login successfull");
    }
    
 }catch(err){
   res.status(400).send("Error"+err.message);
 }

})

app.get('/profile',userAuth,async (req,res)=>{
  try{ 
      const user=req.user;
      res.send(user);  
  }catch(err){
    res.status(400).send("Error"+err.message)
  }
})
app.post('/sendConnectionRequest',userAuth,async(req,res)=>{
  try{
    const user=req.user;
    res.send("connection request send by"+user.firstName);
  }catch(err){
    res.send("ERROR:"+err.message);
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