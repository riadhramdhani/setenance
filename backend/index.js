const express=require("express")
const connectdb = require("./config/connetiondb")
const router = require("./routes/userroute");


require("dotenv").config()
const app= express()
const port= 7000


connectdb()
app.use(express.json())
app.use("/api/auth", require("./routes/userroute"))





app.listen(port, () => console.log(`app running on port ${port}`))