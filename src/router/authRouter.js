const express = require("express");
const useAuth = require("../midleware/useAuth")
const bcrypt = require("bcrypt");
const use = require("../module/User");
const {ValidateSignUpData} = require("../validatedata");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup" , async (req , res) =>{ 

    //console.log(req.body);
   // const data = req.body;
    //const user = new use(data);

    try{
        //validate data
        ValidateSignUpData(req);

        const {firstName,lastName,emailId,password} = req.body;

        const encryPassword = await bcrypt.hash(password , 10);

        const user = new use({firstName , lastName , emailId ,password :encryPassword});
        
        await user.save();
        res.send("data saved sucessfully");
        
    }
    catch(err){
        res.status(401).send(err.message);
    }
   
})

authRouter.post("/login", async (req , res) => {
    try{
        const {password , emailId} = req.body;

        const user = await use.findOne({emailId : emailId});
        if(!user){
            throw new Error("data not found");
        }

        const isPasswordValid = await bcrypt.compare(password , user.password);
        if(isPasswordValid){

            //create jwt token

            const token = jwt.sign({_id : user._id},"Kushal@123", {expiresIn : "1d"})
            console.log(token);

            //wrap jwt token inside the cookie 
            res.cookie("token",token);
            

        
            res.send("log in sucessfully");
        }
        else
            throw new Error("password not match")
    }catch(err){
        res.status(401).send("ERROR  :" + err.message)
    }
})

authRouter.post("/logout" , async(req , res) => {
    res.cookie("token" , null ,{
        expires  : new Date(Date.now())
    })
    res.send("logout succesfully")
})



module.exports = authRouter;