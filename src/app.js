const express = require("express");
const conectDB = require("./database");
const app = express();
const cookieParsel = require("cookie-parser");

const authRouter = require("./router/authRouter");
const profRouter = require("./router/profileRouter")
//const requset = require("./router/reqRouter");
const reqRouter = require("./router/request");
const useRouter = require("./router/userCol")




app.use(express.json());
app.use(cookieParsel());

app.use("/",authRouter);
app.use("/",profRouter);
app.use("/",reqRouter);
app.use("/",useRouter)





    

app.get("/user",async (req , res) => {
    const user = await use.find({emailId: req.body.emailId});

    if(user.length === 0){
        res.send("data not exit");
    }
    else{
        try{
            res.send(user);
        }catch(err){
            res.status(401).send("Some thing went wrong ")
        }
    }
})

app.get("/feed" , async (req , res)=>{
    const user = await use.find({});
    if(user.length === 0){
        res.status(401).send("error found")
    }
    else{
        try{
            res.send(user);
        }catch(err){
            res.status(401).send("Some thing went wrong");
        }
            
        
        
        
    }
})

app.delete("/delete" , async(req,res) => {
    const userid = req.body.id;

    try{
        use.findByIdAndDelete({_id : userid});
        res.send("data deleted sucessfully");
    }catch(err){
        res.send("deleted sucessfully");
    }
})

app.patch("/update/:id" , (req , res) => {
    const useid = req.params?.id;
    const data = req.body;

    try{
        const Allowed = [
            "photo",
            "password",
            "about",
            "skils",
            "gender",
            "age"
        ];

        const isAllowed = Object.keys(data).every((k)=>Allowed.includes(k))

        if(!isAllowed){
            throw new Error("Error is not possible")
        }

        if(data?.skils && data?.skils.length > 10){
            throw new Error("less skill")
        }


        use.findByIdAndUpdate({_id : useid} , data ,{ runValidators : true ,returnDocument : "after"});
        res.send("data updated sucessfully");
    }catch(err){
        res.status(401).send(err.message);
    }

})


conectDB().
    then(()=>{
        console.log("mongo db severrr")
        app.listen(3000 , ()=>{
            console.log("server code")
        });
    })
    .catch((err)=>{
        console.log(err)
    })

