import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { get_services } from '../redux/serviceSlice';

function Cardservice() {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.service);


  useEffect(() => {
    dispatch(get_services());
  }, [dispatch]);



  return (
    <div>
       {services.map((service) => (
        <div key={service.id}>
      <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="{service.img_url}" />
    <Card.Vedio variant="top" src="{service.vedio_url}" />
    <Card.Body>
      <Card.Title>{service.title}</Card.Title>
      <Card.Text>
      {service.adresse}
      </Card.Text>
      <Card.Text>{service.phone_number} </Card.Text>
      <Card.Text>{service.description} </Card.Text>
    </Card.Body>
    
    <Card.Body>
      <Card.Link href="#">Card Link</Card.Link>
      <Card.Link href="#">Another Link</Card.Link>
    </Card.Body>
  </Card>
  </div>
      ))}
  </div>
  )
}

export default Cardservice