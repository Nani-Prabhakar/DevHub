const mongoose=require('mongoose')

const dbURI="mongodb+srv://NaniPrabhakar:Nani%40191079@cluster0.paeuv.mongodb.net/DevHub"

const connectDB=async ()=>{
    await mongoose.connect(dbURI)
}

module.exports=connectDB