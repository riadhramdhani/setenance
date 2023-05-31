import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const initialState = {
  user: null,
  auth: false,
  errors: [],
  loading: false,
};


// register

export const registerUser = createAsyncThunk(
    "/auth/registerUser",
    async (data, { rejectWithValue }) => {
      try {
        const res = await axios.post("http://localhost:7000/api/auth/signup", data);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response.data.errors);
      }
    }
  );
  //login
  export const loginUser = createAsyncThunk(
    "/auth/loginUser",
    async (data, { rejectWithValue }) => {
      try {
        const res = await axios.post("http://localhost:7000/api/auth/signin", data);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response.data.errors);
      }
    }
  );
  //current
  export const currentUser = createAsyncThunk(
    "/auth/currentUser",
    async (data, { rejectWithValue }) => {
      const config={
        headers:{authorization:localStorage.getItem("token")}
      }
      try {
        const res = await axios.get("http://localhost:7000/api/auth/current", config);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response.data.errors);
      }
    }
  );



  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout:(state)=>{
        state.user=null;
        state.auth=false;
        localStorage.removeItem("token")
      }
    },
    extraReducers(builder) {
      builder
      //registre
      .addCase(registerUser.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.auth = true;
        state.loading = false;
        localStorage.setItem("token", payload.token);
        toast.success(payload.msg)
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.user = null;
        state.auth = false;
        state.loading = false;
        payload.forEach((error) => {toast.error(error.msg)
          
        });
      })
        
        //login
        .addCase(loginUser.pending, (state, { payload }) => {
          state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, { payload }) => {
          state.user = payload.user;
          state.auth = true;
          state.loading = false;
          localStorage.setItem("token", payload.token);
          toast.success(payload.msg)
        })
        .addCase(loginUser.rejected, (state, { payload }) => {
          state.user = null;
          state.auth = false;
          state.loading = false;
          payload.forEach((error) => {toast.error(error.msg)
            
          });
        })
        //current
        .addCase(currentUser.pending, (state, { payload }) => {
          state.loading = true;
        })
        .addCase(currentUser.fulfilled, (state, { payload }) => {
          state.user = payload;
          state.auth = true;
          state.loading = false;
          toast.success(payload.msg)
         
        })
        .addCase(currentUser.rejected, (state, { payload }) => {
          state.user = null;
          state.auth = false;
          state.loading = false;
          payload.forEach((error) => {toast.error(error.msg)
            
          });
        })

      }
    
});
export const {logout}= authSlice.actions;
export default authSlice.reducer;
