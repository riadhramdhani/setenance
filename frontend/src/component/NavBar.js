import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"
import { FiSettings } from "react-icons/fi"
import { ImProfile } from "react-icons/im"
import { BsFillPersonPlusFill } from "react-icons/bs"
import { MdOutlineMiscellaneousServices } from "react-icons/md"
import { BsFillGearFill } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./monia.css"


function NavBar() {
  const auth = useSelector((state) => state.auth.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handelelogout = () => {
    dispatch(logout())
    navigate("/")
  }
  return (
    <div>
        <Navbar key="lg" bg="light" expand="lg" className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#"><p><FiSettings /><i>Riadh_Multiservice</i></p></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-$lg`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-$lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-$lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-$lg`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                
                {
                auth ?
                <>
                  <Nav className="justify-content-start flex-grow-1 pe-3">
                    <Nav.Link as={Link} to="/profile" href="#action2">profile <ImProfile /></Nav.Link>
                    <Nav.Link as={Link} to="/cardservice" href="#action2">cardservice <MdOutlineMiscellaneousServices /> </Nav.Link>
                    <Nav.Link as={Link} to="/addedit" href="#action2"><BsFillGearFill />+</Nav.Link>
                  
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <div style={{display:"flex",gap:"10px"}}>
                  <Button variant="outline-success">Search</Button>
                  <Button variant="outline-primary" className='ria' onClick={handelelogout}>logout</Button>
                  </div>
                </Form>
                </>
                 :
                 <>
                   <Nav.Link as={Link} to="/" href="#action1">Home <FaHome /></Nav.Link>

                   <Nav.Link as={Link} to="/register" href="#action2">register <BsFillPersonPlusFill /></Nav.Link>
                 </>
             }
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </div>
  )
}

export default NavBar