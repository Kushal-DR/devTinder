const express = require("express");
const useAuth = require("../midleware/useAuth");
//const RequestedSchema = require("../module/RequestSchema");
const RequestSchema = require("../module/RequestSchema");
const use = require("../module/User");

const reqRouter = express.Router();

reqRouter.post("/request/send/:status/:userId",useAuth, async (req ,res) => {
    
  try{
    const fromReqId = req.User._id;
    const toReqId = req.params.userId;
    const ReqStatus = req.params.status;

    console.log(typeof(toReqId))
    
    const reqData = ["ignored","intrested"];

    if(!reqData.includes(ReqStatus))
        throw new Error("Requested Status is wrong")
    
    const isuserData =await use.findById(toReqId);
    console.log("hjhjkjkl");
    if(!isuserData)
        throw new Error("entered user data not their")

   const ifUserAlready = await RequestSchema.findOne({
        $or : [
            {fromReqId , toReqId},
            {fromId : toReqId , toId : fromReqId}
        ]

        }
    )

    if(ifUserAlready)
        throw new Error("connection already exist")

    console.log("gjhjh");

    const RequestedSchema = new RequestSchema({fromId:fromReqId , toId:toReqId ,status:ReqStatus});
    
    await RequestedSchema.save();

    res.send(`connection requested ${ReqStatus} handel sucessfully`)

}catch(err){
    res.send("Error : " + err.message);
}
})

reqRouter.post("/request/rewive/:status/:userId", useAuth , async(req ,res) => {

  try{
    const loginUser = req.User;
    const reqStatus = req.params.status;
    const reqId  = req.params.userId;

    const valStatus = ["accepted" , "reject"]
    const isStatusValid = valStatus.includes(reqStatus);

    if(!isStatusValid)
        throw new Error("status is not valid here");

    console.log("ghgjhkjj");

    const isReqValid = await RequestSchema.findOne({
        _id : reqId,
        toId : loginUser._id,
        status : "intrested"

    })
    console.log("gghjffh");

    if(!isReqValid)
        throw new Error("userid information is wrong")

    isReqValid.status = reqStatus;
    isReqValid.save();

    res.send(`connection ${reqStatus} handeled sucessfolly`)
  }catch(err){
    res.status(401).send("erroe" + err.message);
  }


})


module.exports = reqRouter;