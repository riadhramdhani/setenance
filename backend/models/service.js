const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  img_url: {
    type: String,
    require: true,
    
  },
  vedio_url: {
    type: String
    
  },
  phone_number: {
    type:String,
    require:true,
  },
  adresse: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref :"User",
  },
  rate: {
    type:Number,
  }, 
  createdAt: {
    type: Date,
    default: Date.now
  }

  
});

module.exports = mongoose.model("Service", serviceSchema);