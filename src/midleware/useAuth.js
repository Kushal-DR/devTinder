const jwt = require("jsonwebtoken");
const user = require("../module/User");

const UseAuth = async(req , res,next) => {
try{
    const {token} = req.cookies;
    if(!token)
        throw new Error("Token not exits...")
    
    const decodeMsg = await jwt.verify(token , "Kushal@123");

    const {_id} = decodeMsg;

    const User = await user.findById({_id});

    if(!User){
        throw new Error("User data exists .......")
    }
    req.User = User;
    next();
}catch(err){
    res.send("Error :" + err.message);
} 
}

module.exports = UseAuth;