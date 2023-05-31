import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import serviceReducer from "./serviceSlice"
import chatReducer from "./chatSlice"
import  userReducer  from "./userSlice"




const store = configureStore({
    reducer: {
      auth: authReducer,
      services: serviceReducer,
      chat : chatReducer,
      user : userReducer
    },
  });
  
  export default store;