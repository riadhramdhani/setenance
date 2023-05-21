import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {  Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"
import {FiSettings} from "react-icons/fi"
import {ImProfile} from "react-icons/im"
import {BsFillPersonPlusFill} from "react-icons/bs"
import {MdOutlineMiscellaneousServices} from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';



function NavBar() {
  const auth =useSelector((state)=> state.auth.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handelelogout=()=>{
    dispatch(logout())
    navigate("/")
  }
  return (
    <div>
        <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#"> <p><FiSettings /><i>Riadh_Multiservice</i></p></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {
              auth?
              <>
              <Nav.Link as={Link} to="/profile" href="#action2">profile <ImProfile/></Nav.Link>
              <Nav.Link as={Link} to="/cardservice" href="#action2">cardservice <MdOutlineMiscellaneousServices/> </Nav.Link>
              <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Button variant="outline-primary" onClick={handelelogout}>logout</Button>
          </>
          :
          <>
          <Nav.Link as={Link} to="/" href="#action1">Home <FaHome /></Nav.Link>
            
            <Nav.Link as={Link} to="/register" href="#action2">register <BsFillPersonPlusFill/></Nav.Link>
            </>
            }
            
            
            
            
            
          
          </Nav>
          

          
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar