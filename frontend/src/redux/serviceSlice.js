import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    services: [],
    service : null,
    auth: false,
    errors: [],
    loading: false,
    edit:false,
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
  //add service
  export const add_services = createAsyncThunk(
    "/service/add_services",
    async (data, { rejectWithValue }) => {
      const config={
        headers:{authorization:localStorage.getItem("token")}
      }
      try {
        const res = await axios.post("http://localhost:7000/api/service/addservice", data,config);
        return res.data;
        
      } catch (error) {
        return rejectWithValue(error.response.data.errors);
      }
    }
  );
  //deleteservice
  export const delete_services= createAsyncThunk(
    "/service/delete_services",
    async (id, { rejectWithValue }) => {
      const config={
        headers:{authorization:localStorage.getItem("token")}
      }
      try {
         axios.delete(`http://localhost:7000/api/service/deleteservice/${id}`, config);
         
       
        
      } catch (error) {
        return rejectWithValue(error.response.data.errors);
      }
    }
  );
  //update service
  export const update_service = createAsyncThunk(
    "/service/update_service",
    async (id, data,{ rejectWithValue }) => {
      const config={
        headers:{authorization:localStorage.getItem("token")}
      }
      try {
        const res = await axios.put(`http://localhost:7000/api/service/updateservice/${id}`,data,config);
        return res.data;
        
      } catch (error) {
        return rejectWithValue(error.response.data.errors);
      }
    }
  );
  //getone service
  export const get_service = createAsyncThunk(
    "/service/get_service",
    async (id, { rejectWithValue }) => {
      const config={
        headers:{authorization:localStorage.getItem("token")}
      }
      try {
        const res = await axios.get(`http://localhost:7000/api/service/get_one_service/${id}`, config);
        return res.data.service;
        
      } catch (error) {
        return rejectWithValue(error.response.data.errors);
      }
    }
  );



  export const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
      toggleTrue: (state,{ payload }) => {    
        state.edit = true;
        state.auth = true
        state.loading= false
      },
      toggleFalse: (state,{ payload }) => {        
        state.edit = false;
        state.auth = true
        state.loading= false
      },
      
    },
    extraReducers(builder) {
      //addcase get
        builder
        .addCase(get_services.pending, (state, { payload }) => {
          state.loading = true;
        })
        .addCase(get_services.fulfilled, (state, { payload }) => {
          state.services = payload.services;
          state.service= payload.service
          state.auth = true;
          state.loading = false
          toast.success(payload.msg)
        })
        .addCase(get_services.rejected, (state, { payload }) => {
          state.services = null;
          state.service= null;
          state.auth = false;
          state.loading = false;
          payload.forEach((error) => {toast.error(error.msg)
            
          });
        })
        //addcace post
        .addCase(add_services.pending, (state, { payload }) => {
          state.loading = true;
        })
        .addCase(add_services.fulfilled, (state, { payload }) => {
          state.services = payload.services;
          state.service= payload.service
          state.auth = true;
          state.loading = false
          toast.success(payload.msg)
        })
        .addCase(add_services.rejected, (state, { payload }) => {
          state.services = null;
          state.auth = false;
          state.loading = false;
          payload.forEach((error) => {toast.error(error.msg)
            
          });
        })
        //addcase delete
        .addCase(delete_services.pending, (state, { payload }) => {
          state.loading = true;
        })
        .addCase(delete_services.fulfilled, (state, { payload }) => {
          state.auth = true;
          state.loading = false
          toast.success(payload)
        })
        .addCase(delete_services.rejected, (state, { payload }) => {
          state.service= null;
          state.auth = false;
          state.loading = false;
          
        })
        //addcase update
        .addCase(update_service.pending, (state, { payload }) => {
          state.loading = true;
        })
        .addCase(update_service.fulfilled, (state, { payload }) => {
          
          state.service= payload.serviceupdate
          state.auth = true;
          state.loading = false
          state.edit = true;
          toast.success(payload.msg)
        })
        .addCase(update_service.rejected, (state, { payload }) => {
          state.services = null;
          state.auth = false;
          state.loading = false;
          // payload.forEach((error) => {toast.error(error.msg)
            
          // });
        })
        //addcase getoneservice
        .addCase(get_service.pending, (state, { payload }) => {
          state.loading = true;
        })
        .addCase(get_service.fulfilled, (state, { payload }) => {
          
          state.service= payload.service
          state.auth = true;
          state.loading = false
          toast.success(payload.msg)
        })
        .addCase(get_service.rejected, (state, { payload }) => {
          
          state.service = null;
          state.auth = false;
          state.loading = false;
          // payload.forEach((error) => {toast.error(error.msg)
            
          // });
        })
    }
    
});
export const{toggleTrue,toggleFalse}= serviceSlice.actions

export default serviceSlice.reducer;