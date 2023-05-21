import React, { useEffect } from "react";
import './App.css';
import Login from "./pages/login/Login";
import NavBar from "./component/NavBar"
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Profile from "./pages/profile/Profile";
import Notfound from "./pages/Notfound";
import Cardservice from "./pages/Cardservice"
import { useDispatch } from "react-redux";
import { currentUser } from "./redux/authSlice";
import Privateroutes from "./component/Privateroutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch= useDispatch()
  useEffect(()=>{
    dispatch(currentUser())
  },[dispatch])
  return (
    <>
      <NavBar />
      
      

      

      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Privateroutes ><Profile/></Privateroutes>} />
      <Route path="/cardservice" element={<Privateroutes ><Cardservice/></Privateroutes>} />
      <Route path="/*" element={<Notfound />} />
    </Routes>
    <ToastContainer />
    </>
    
  );
}

export default App;
