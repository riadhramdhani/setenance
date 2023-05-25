const router= require("express").Router()
const chatcontroler= require("../controler/chatcontroler")

// Get all messages between two users
router.get('/api/:senderId/:receiverId', chatcontroler.getMessages);

// Save a new message
router.post('/api/sendmessage', chatcontroler.saveMessage);
module.exports= {chatrouter:router}
