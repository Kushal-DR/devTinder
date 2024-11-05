const express = require("express");

const app1 = express();

const {authu , authu2} = require("./midware2")

/*app1.use("/user",(req,res,next)=>{
    console.log("kusahal");
    
    res.send("handler 1");
    next();
},
(req,res,next)=>{
    console.log("sending");
    res.send("handler 2");

}
)*/
/*app1.use("/user",authu)
app1.use("/login",authu2)

app1.get("/login",(req,res,next)=>{
    res.send("login")});

app1.get("/user/add",(req,res,next)=>{
    res.send("kushal");
})

app1.post("/user/delete",(req,res)=>{
    console.log("lathesh");
    res.send("lathesh");
})
    */


//error handlling in 

app1.use("/" , (err , req ,res , next) => {
    if(err){
        res.status(501).send("some error occures");
    }
})


app1.use("/getdata" , (req , res , next)=>
{
    try{
        throw new Error("kushal");
        res.send("lathesk")
    }
    catch(err){
        res.status(501).send("some error in try occures");
    }
    //throw new Error("kushal");
    res.status(501).send("lathesk")
})
/*app1.use("/" , (err , req ,res , next) => {
    if(err){
        res.status(501).send("some error occures");
    }
})*/






app1.listen(2000)