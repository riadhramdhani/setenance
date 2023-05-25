import { useEffect } from 'react'
import Card from 'react-bootstrap/Card';


import { useDispatch, useSelector } from 'react-redux';
import { get_services } from '../redux/serviceSlice';


function Cardservice(el) {
 
  const services = useSelector((state) => state.services.services);
  console.log(services)

  const dispatch= useDispatch()
  


  useEffect(() => {
    dispatch(get_services());
   
  }, [dispatch]);



  return (
    <div>
       {services.map((el) => (
        <div key={el?._id}>
          <h4>{el?.userId.username}</h4>
     
    <Card.Img variant="top" src={el?.img_url} />

    <Card.Body>
      <Card.Title>{el?.title}</Card.Title>
      <Card.Text>
      {el.adresse}
      </Card.Text>
      <Card.Text>{el?.phone_number} </Card.Text>
      <Card.Text>{el?.description} </Card.Text>
    </Card.Body>
    
   
  
  </div>
      ))}
  </div>
  )
}

export default Cardservice