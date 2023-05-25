import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import serviceReducer from "./serviceSlice"
import chatReducer from "./chatSlice"




const store = configureStore({
    reducer: {
      auth: authReducer,
      services: serviceReducer,
      chat : chatReducer
    },
  });
  
  export default store;