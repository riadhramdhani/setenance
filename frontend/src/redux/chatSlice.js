import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async ({ senderId, receiverId }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:7000/api/${senderId}/${receiverId}`);
       
        const messages = response.data;
        return messages;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({ sender, receiver, message }, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:7000/api/sendmessage', {
          sender,
          receiver,
          message,
        });
        const newMessage = response.data;
        return newMessage;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  const initialState = {
    messages: [],
    loading: false,
    error: null,
  };
  
  const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
      clearMessages: (state) => {
        state.messages = [];
        state.loading = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMessages.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchMessages.fulfilled, (state, action) => {
          state.messages = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchMessages.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(sendMessage.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
          state.messages.push(action.payload);
          state.loading = false;
          state.error = null;
        })
        .addCase(sendMessage.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { clearMessages } = chatSlice.actions;
  
  export default chatSlice.reducer;
  

  