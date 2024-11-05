const express = require("express");
const UseAuth = require("../midleware/useAuth");
const useRouter = express.Router();
const User = require("../module/User");

const RequestSchema = require("../module/RequestSchema");


useRouter.get("/user/receive" , UseAuth , async(req , res) => {
 try{
    const logUser = req.User;

    const requestData = await RequestSchema.find({
        toId : logUser._id,
        status : "intrested"
    }).populate("fromId" , ["firstName" ,"lastName"])

    if(!requestData)
        throw new Error("no req was recived");

    res.send(requestData)

}catch(err){
    res.status(401).send("ERROR  " + err.message)
}
})

useRouter.get("/user/connection" , UseAuth ,async(req , res) => {

try{
    const logUser = req.User;
    const connectioReq = await RequestSchema.find({
        $or : [
            {fromId :logUser._id , status : "accepted"},
            {toId : logUser._id , status :"accepted"}
            
        ]
    }).populate("fromId" , ["firstName" ,"lastName"]).populate("toId" , ["firstName" ,"lastName"])

    const Data = connectioReq.map(row => {
        if(row.fromId.toString() === logUser._id.toString())
            return row.toId

        return row.fromId
    })

    res.json({data : Data})
}catch(err){
    res.send(err.message);
}
})

useRouter.get("/feed" , UseAuth , async(req , res)=>{
  try{
    const logUser = req.User;

    //to restrict no of card at time use skip and limit in mongoo db
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;


    const connectedReq =await RequestSchema.find({
        $or : [
        {fromId : logUser._id} , {toId : logUser._id}
        ]
    }).select("fromId toId")

    const connectedId = new Set();

    connectedReq.forEach((data) => {
        connectedId.add(data.fromId)
        connectedId.add(data.toId)
    })

    const feeddata = await User.find({
        $and : [
           {_id : {$nin : Array.from(connectedId)}},
           {_id : {$ne : logUser._id}}
        ]
    }).select("firstName lastName").skip(skip).limit(limit);

    res.send(feeddata);
}catch(err){
    res.send("error : " + err.message)
}
} )

module.exports = useRouter