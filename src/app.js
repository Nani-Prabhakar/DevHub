const express=require('express')

const app=express()
const {userAuth}=require("../middlewares/auth")
app.get("/user/data",userAuth,(req,res)=>{
    //console.log(req.params)
    res.send("i love u")
})
app.use("/*fly$/",(req,res)=>{
    res.send("i love ")
})
app.listen(7777)