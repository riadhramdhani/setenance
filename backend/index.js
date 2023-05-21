const express=require("express")
const connectdb = require("./config/connetiondb")
const {userRouter}=require("./routes/userroute")
const { serviceRouter } = require("./routes/serviceroute")
const { authRouter } = require("./routes/authroute")
const { comRouter } = require("./routes/comroute")



require("dotenv").config()
const app= express()
const cors=require ("cors")
const port= 7000


connectdb()
app.use(cors({
    origin:"http://localhost:3000",
    credentials:false,
    optionsSuccessStatus:200
}))
app.use(express.json())
// app.use("/api/auth", require("./routes/authroute"))

app.use("/api/auth", authRouter)
app.use("/api/service",serviceRouter)
app.use("/api/user", userRouter)
// app.use("/api/service", require("./routes/serviceroute"))
// app.use("/api/commantaire", require("./routes/comroute"))
app.use("/api/commantaire", comRouter)







app.listen(port, () => console.log(`app running on port ${port}`))