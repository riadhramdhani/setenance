const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  profession: {
    type:String,
    enum:["visiteur","worker"],
    
  }
  ,
  role: {
    type:String,
    enum:["user","admin"],
    default : "user"
    
  }
});

module.exports = mongoose.model("User", userSchema);