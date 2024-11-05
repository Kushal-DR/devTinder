const express = require("express")
const useAuth = require("../midleware/useAuth")
const use = require("../module/User");
const {validateProfileUpdate ,ValidatePassword} = require("../validatedata")
const bcrypt = require("bcrypt");


const profRouter = express.Router();


profRouter.get("/profile/view" ,useAuth , async (req , res) =>{
    try{
        /*const coo = req.cookies;

        const {token} = coo;

        //validate the cookie
        const decodedMsg = await jwt.verify(token , "Kushal@123")
        console.log(decodedMsg)

        const user = await use.find({_id : decodedMsg._id});
        //console.log(user);*/
        const user = req.User;
        
        res.send(user)
}catch(err){
    res.send(err.message);
}
    
});

profRouter.patch("/profile/update" , useAuth , async (req ,res) => {
    
try{
    
    if(!validateProfileUpdate(req))
    {
        
        throw new Error("entered data is wrong");
    }

   
    const loggedInUser = req.User;
    
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))
    loggedInUser.save();

    res.send("update sucessfully");
}catch(err){
    res.status(201).send("ERROR  :  "  + err.message );
}

} )

profRouter.patch("/profile/forpass" , useAuth ,async (req , res) => {
 try{
    ValidatePassword(req)

    const passval = await bcrypt.compare(req.body.password , req.User.password);

    if(!passval){
        throw new Error("password not match")
    }

    req.User.password = await bcrypt.hash(req.body.newpassword , 10);

    req.User.save();

    res.send("password update sucessfully")
 }
 catch(err)
 {
    res.send("Error : " + err.message );
 }
})

module.exports = profRouter;