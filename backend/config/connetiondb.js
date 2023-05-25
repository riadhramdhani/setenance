const mongoose = require("mongoose");


const connectdb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
  useUnifiedTopology: true,
    });

    console.log("database connected with success");
  } catch (error) {
    console.log("not connected");
  }
};

module.exports = connectdb;