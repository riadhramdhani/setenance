import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    services: [],
    auth: false,
    errors: [],
    loading: false,
  };
  //getallservices
  export const get_services = createAsyncThunk(
    "/service/get_services",
    async (data, { rejectWithValue }) => {
      try {
        const res = await axios.get("http://localhost:7000/api/service/allservice", data);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response.data.errors);
      }
    }
  );


  export const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
      
    },
    extraReducers(builder) {
        builder
        .addCase(get_services.pending, (state, { payload }) => {
          state.loading = true;
        })
        .addCase(get_services.fulfilled, (state, { payload }) => {
          state.services = payload.services;
          state.auth = true;
          state.loading = false
          toast.success(payload.msg)
        })
        .addCase(get_services.rejected, (state, { payload }) => {
          state.services = null;
          state.auth = false;
          state.loading = false;
          payload.forEach((error) => {toast.error(error.msg)
            
          });
        })
        
    
    }
    
});

export default serviceSlice.reducer;