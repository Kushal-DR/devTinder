const mongoose = require("mongoose")

const conectDB = async () =>{
    await mongoose.connect("mongodb://localhost:27017/devTinder");
}

module.exports = conectDB;                                                                                          