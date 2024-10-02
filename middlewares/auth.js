const userAuth=(req,res,next)=>{
    const token="xyz";
    if(token==="xyz"){
        console.log("user authorized successfully");
        next();
    }else{
        res.status(401).send("unauthorized user")
    }
}

module.exports={
    userAuth,
}