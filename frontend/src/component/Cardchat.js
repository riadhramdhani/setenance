import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Flex, Text, Input, Button, Spacer, VStack } from '@chakra-ui/react';
import { fetchMessages, sendMessage } from '../redux/chatSlice';
import { io } from 'socket.io-client';
import {FiSend} from "react-icons/fi"
import "./monia.css"

const Chat = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState('');
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io('http://localhost:7000'); // Replace with your Socket.io server URL

    // Event for receiving messages
   

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMessages({ senderId, receiverId }));
  }, [dispatch, senderId, receiverId]);
const handleSubmit = (e) => {
    var data={sender:senderId,receiver:receiverId,message:message}
    e.preventDefault();
    
        // Handle received message
        dispatch(sendMessage(data));
      
    if (message.trim() !== '') {
      const socket = io('http://localhost:7000'); // Replace with your Socket.io server URL

      // Emit a message event to the server
      socket.emit('message', {
        sender: senderId,
        receiver: receiverId,
        message: message,
      });

     

      setMessage('');
    }
  };

  return (
    <Box p={4} className='chatbox'>
      <div className="chatbox-header">Messenger</div>
      <Flex direction="column" height="100%">
        <Box flex={1} overflowY="scroll">
          <VStack spacing={4} align="start">
            {messages.map((msg, index) => (
              <Box key={index} p={2} borderWidth="1px" borderRadius="md">
                <Text>{msg.sender}: {msg.message}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
        
        <Box className='chatbox-message'>
          <form onSubmit={handleSubmit}>
            <Flex align="center">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="message..."
             className='chatbox-input' />
              <Spacer />
              <Button type="submit" className='chatbox-button'><FiSend/></Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default Chat;