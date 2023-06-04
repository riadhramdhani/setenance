import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaTwitter, FaFacebook ,FaGithub, FaYoutube} from 'react-icons/fa';
import{MdPhotoCamera} from 'react-icons/md'
import "./profile.css"
import { currentUser } from '../../redux/authSlice';
import axios from"axios"
import { toast } from "react-toastify";
import Cardchat from "../../component/Cardchat"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';




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
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '350px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
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
                  <input type="file" onChange={e=>setFile(e.target.files[0])}/>
                 
                  <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}} onClick={handleEdit}>
                    Edit profile < MdPhotoCamera  className="photo-icon" />
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">my profile</MDBTypography>
                  <MDBCardText> <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Profession:</strong> {user.profession}
      </p></MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                    <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                    <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
                <MDBRow>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="g-2">
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
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
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <>
      <Cardchat senderId={user._id} receiverId={user._id}
   />
      </>
    </div>
     
  );
}

export default Profile