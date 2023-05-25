import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaTwitter, FaFacebook ,FaGithub, FaYoutube} from 'react-icons/fa';
import{MdPhotoCamera} from 'react-icons/md'
import "./profile.css"
import { currentUser } from '../../redux/authSlice';
import axios from"axios"
import { toast } from "react-toastify";
import Cardchat from "../../component/Cardchat"


function Profile() {
  
  const user = useSelector((state) => state.auth.user);
  const[file,setFile]=useState("")
  const dispatch = useDispatch()

  const handleEdit= async(e)=>{
    e.preventDefault()
    let data= new FormData()
    data.append("myimg",file)
    const config={
      headers:{authorization:localStorage.getItem("token")},
    }
    try {
      await axios.patch("http://localhost:7000/api/user/profileimg",data,config)
      dispatch(currentUser())
    } catch (error) {
      toast.error(error.msg)
    }
  }
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
       <h2>Profile</h2>
       <div>
        
       {user?.imgUrl?<img
                    src={`uploads/${user.imgUrl}`}
                    alt="Admin"
                    className="rounded-circle"
                    width={150}
                  />
                 :<img
                    src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                    alt="Admin"
                    className="rounded-circle"
                    width={150}
                  />}
                  </div>
                  <div>
                  <input type="file" onChange={e=>setFile(e.target.files[0])}/>
                 < MdPhotoCamera  className="photo-icon" />
                 
                   <button className="btn btn-outline-primary" onClick={handleEdit}>edit</button></div>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Profession:</strong> {user.profession}
      </p>
      <div>
      <a href="https://twitter.com/votrecompte" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
      <a href="https://www.facebook.com/votrepage" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a href="https://github.com/votreutilisateur" target="_blank" rel="noopener noreferrer">
  <FaGithub />
</a>

<a href="https://www.youtube.com/votrechaine" target="_blank" rel="noopener noreferrer">
  <FaYoutube />
</a>
    </div>
    <>
    <Cardchat senderId={user._id} receiverId={user._id}
 />
    </>
     
    </div>
  )
}

export default Profile