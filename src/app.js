const express=require('express')
const app=express()
app.use("/nani",(req,res)=>{
    res.send("i love u")
})
app.use("/",(req,res)=>{
    res.send("i love ")
})
app.listen(7777)