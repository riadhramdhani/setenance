const express=require("express")
const connectdb = require("./config/connetiondb")
require("dotenv").config()
const app= express()
const port= 7000


connectdb()





app.listen(port, () => console.log(`app running on port ${port}`))