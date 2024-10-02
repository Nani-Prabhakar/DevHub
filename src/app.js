const express=require('express')
const app=express()
app.get("/nani/a*c/:userID/:name",(req,res)=>{
    console.log(req.params)
    res.send("i love u")
})
app.use("/*fly$/",(req,res)=>{
    res.send("i love ")
})
app.listen(7777)