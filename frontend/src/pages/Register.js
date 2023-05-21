import { useState,useEffect } from 'react'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../App.css'
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";



function Register() {
  const [data, setData] = useState({ username: "", email: "", password: "",profession:"" });
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);
  return (
    <div><Form id='re' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>username</Form.Label>
      <Form.Control type="text" placeholder="Enter name" name="username" onChange={handleChange} />
      <Form.Text className="text-muted">
        your username please
      </Form.Text>
    </Form.Group>


    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange}/>
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
    
    

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
      <Form.Text className="text-muted">
      at least 06 characters
      </Form.Text>
    </Form.Group>
    

    <Form.Select aria-label="Default select example"  name="profession" onChange={handleChange} >
      <option > profession   </option>
      <option value="visiteur">visiteur</option>
      <option value="worker">worker</option>
    </Form.Select>


    <Button variant="primary" type="submit">
      Register
    </Button>
    <p>
            Have an account ? <Link to="/">Sign in</Link>
          </p>
  </Form></div>
  )
}

export default Register