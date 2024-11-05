const mongoose = require("mongoose")
const User = require("../module/User")

const ConnectionRequestSchema = new mongoose.Schema({
    fromId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true
    },
    toId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:User,
        required : true
    },
    status : {
        type:String,
        required : true,
        enum : {
            values : ["ignored","intrested","accepted" , "reject"],
            message : `{VALUE} is incorect status type `
        }
    }
},
{
    timestamps:true
});

ConnectionRequestSchema.pre("save" , function(next){
    const ConnectionRequest = this;

    if(ConnectionRequest.fromId.equals(ConnectionRequest.toId))
        throw new Error("we con't build conection with your self")

    next();

})

const RequestSchema = mongoose.model("RequestSchema" , ConnectionRequestSchema );

module.exports = RequestSchema;