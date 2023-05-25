const express=require("express")
const connectdb = require("./config/connetiondb")
require("dotenv").config()
const app= express()

const socket = require('socket.io');
const cors=require ("cors")
const port= 7000
const {userRouter}=require("./routes/userroute")
const { serviceRouter } = require("./routes/serviceroute")
const { authRouter } = require("./routes/authroute")
const { comRouter } = require("./routes/comroute")
const {chatrouter} = require("./routes/chatroute")


connectdb()
app.use(cors())
app.use(express.json())
// app.use("/api/auth", require("./routes/authroute"))
// Socket.io connection


app.use("/api/auth", authRouter)
app.use("/api/service",serviceRouter)
app.use("/api/user", userRouter)
// app.use("/api/service", require("./routes/serviceroute"))
// app.use("/api/commantaire", require("./routes/comroute"))
app.use("/api/commantaire", comRouter)
app.use ("/",chatrouter)



const server=app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  io.on('connection', (socket) => {
    
    console.log('A user connected');
  
    // Listen for new chat messages
    socket.on('chat message', async (data) => {
      try {
        // Save the message to the database
        const { sender, receiver, message } = data;
        const newMessage = new Chat({ sender, receiver, message });
        await newMessage.save();
  
        // Emit the message to the recipients
        socket.to(receiver).emit('chat message', newMessage);
      } catch (error) {
        console.error(error);
      }
    });
  
    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });