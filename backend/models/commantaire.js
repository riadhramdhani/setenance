const mongoose = require("mongoose");

const comSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
     timestamps: true 
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref :"User",
  },
   serviceId:{
    type: String,
    require: true,
  },
  rate: {
    type:Number,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
 

   
   
  
});
module.exports = mongoose.model("Com", comSchema);
