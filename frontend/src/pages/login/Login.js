import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link,  useNavigate } from "react-router-dom";

import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/authSlice';


function Login() {
  const [data, setData] = useState({  email: "", password: "" });
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);


  return (
    <div className='re'><Form className='form' onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
     
    </Form.Group>
    <Button variant="primary" type="submit">
      Login
    </Button>
    <p>
            Don't have an account ? <Link to="/register">Sign up</Link>
          </p>
  </Form>
  <div className='landpage'>
  
 
  
<img
  src="https://www.gers-multiservices.fr/userfiles/39278/GERS-MUTISERVICES-logo-en-cours-bl-v2.png"
  alt="..."
  width='60%'
  height='700px'
/>

</div>
  </div>
  
  )
}

export default Login