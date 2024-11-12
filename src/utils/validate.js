const validator=require('validator')
const  validateSignInData=(req)=>{
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
const validateEditData=(req)=>{
    const validEdits=[
        "firstName",
        "lastName",
        "age",
        "gender",
        "skills",
        "about",
        "photoURL"
    ]
    const isValidEdit=Object.keys(req.body).every((field)=>validEdits.includes(field));

    return isValidEdit;
}
module.exports={
    validateSignInData,
    validateEditData,
}