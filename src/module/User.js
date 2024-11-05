
const mongoose = require("mongoose");
const validator = require("validator");

const userschema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 25
    },
    lastName : {
        type : String,
    },
    emailId : {
        type : String,
        required : true,
        
        lowercase : true,
        unique : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("email is invalid")
                
        }
    },
    password:{
        type : String,
        minLength: 8,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("it is not strong passward");
            }
        }
    },
    age : {
        type :Number,
        min: 18
    },
    gender : {
        type : String,
        validate(value){
            if(!["male" , "female" , "other"].includes(value)){
                throw new Error("gender is not valid")
            }

        }
    },
    photo : {
        type:String,
        default:"",
        /*validate(value){
            if(!validator.isURL(value)){
                throw new Error("it is not curect url")
            }
        }*/

    },
    about : {
        type : String,
        default : "this is my account",
    },
    skils : {
        type : [String]
    }
},
{
    timestamps : true

});

const use = mongoose.model("User" , userschema);

module.exports = use;