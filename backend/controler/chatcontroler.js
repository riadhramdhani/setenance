const Chat= require("../models/chatmodel")

const getMessages = async (req, res) => {
    console.log(req.body)
    try {
      const { senderId, receiverId } = req.params;
      const messages = await Chat.find({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId },
        ],
      }).sort({ timestamp: 1 });
  
      res.json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  };
  
  // Save a new message
  const saveMessage = async (req, res) => {
    console.log(req.body)

    try {
      const { sender, receiver, message } = req.body;
      const newMessage = new Chat({ sender, receiver, message });
      await newMessage.save();
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  };
  
  module.exports = { getMessages, saveMessage };
  
  
  