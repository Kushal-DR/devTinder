const validator = require("validator");

const ValidateSignUpData = (req)=>{
    const {firstName , lastName , emailId , password} = req.body;

    if(!firstName || !lastName)
        throw new Error("enter the name");
    else if(!validator.isEmail(emailId))
        throw new Error("email is wrong")
    else if(!validator.isStrongPassword(password))
        throw new Error("enter strong password")
}

const validateProfileUpdate = (req) =>
{
    const dataUpdate = [
        "firstName",
        "lastName",
        "emailId",
        "age",
        "gender",
        //photo,
        "about",
        "skils"

    ]

    const valid = Object.keys(req.body).every((k) => dataUpdate.includes(k))

    return valid;
}

const ValidatePassword = (req) => {
    if(!validator.isStrongPassword(req.body.newpassword))
        throw new Error("new password is not a strond password");


}

module.exports = {ValidateSignUpData , validateProfileUpdate ,ValidatePassword}