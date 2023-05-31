import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const initialState = {
  users : []  ,
  user: null,
  auth: false,
  errors: [],
  loading: false,
};
//get all users
export const get_users = createAsyncThunk(
    "/service/getusers",
    async (data, { rejectWithValue }) => {
        const config={
            headers:{authorization:localStorage.getItem("token")}
          }
      try {
        const res = await axios.get("http://localhost:7000/api/user/getalluseres", data,config);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response.data.errors);
      }
    }
  );

 



export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      
      },
    
    extraReducers(builder) {
        builder
        .addCase(get_users.pending, (state, { payload }) => {
            state.loading = true;
          })
          .addCase(get_users.fulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.auth = true;
            state.loading = false;
            localStorage.setItem("token", payload.token);
            toast.success(payload.msg)
          })
          .addCase(get_users.rejected, (state, { payload }) => {
            state.user = null;
            state.auth = false;
            state.loading = false;
            payload.forEach((error) => {toast.error(error.msg)
              
            });
          })
         
      

    }
})









export default userSlice.reducer;