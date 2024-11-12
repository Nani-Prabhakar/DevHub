const validator=require('validator')
const  validateData=(req)=>{
    const {firstName,lastName,email,password}=req.body;
    const isValidEmail=validator.isEmail(email);
    const isStrongPassword=validator.isStrongPassword(password)
    if(!isValidEmail){
        throw new Error("Enter valid Email")
    }
    if(!isStrongPassword){
        throw new Error("your password is not strong enough")
    }
}

module.exports={
    validateData,
}