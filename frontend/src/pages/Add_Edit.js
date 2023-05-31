import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { add_services, update_service} from '../redux/serviceSlice';
import { useNavigate } from 'react-router-dom';




function Add_Edit({service}) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState({ title: "", img_url: "", vedio_url: "",phone_number:"" , adresse:"", description:"", rate:""});
    const servic= useSelector((state)=> state.services.service)
    console.log(service)
    const edit = useSelector((state)=> state.services.edit)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
   service? setData({title: service.title,img_url:service.img_url,vedio_url:service.vedio_url,phone_number:service.phone_number,
      adresse:service.adresse,description:service.description,rate:Number(service.rate),createdAt:service.createdAt
      
      
    }): setData({title:"",img_url:"",vedio_url:"",phone_number:"",adresse:"",description:"",rate:"",createdAt:""})
  //     if (service) {
  //       navigate("/Cardservice");
  //     }
    }, [service ]);
  //function add
  const handleAdd = (e) => {
    // e.preventDefault();
    dispatch(add_services({title:data.title,img_url:data.img_url,vedio_url:data.vedio_url,phone_number:data.phone_number,
    adresse:data.adresse,description:data.description,rate:Number(data.rate)}));
    navigate("/cardservice")
  };
  //function update
  const handleEdit = (id,data) => {
    // e.preventDefault();
    dispatch(update_service(id,data),handleClose());
  };






  




  return (
    <div>
        <>
      <Button variant="primary" onClick={handleShow}>
        ADD_EDIT
      </Button>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>title</Form.Label>
      <Form.Control type="text" placeholder="Enter title" name="title" onChange={handleChange} value={data.title} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>img_url</Form.Label>
      <Form.Control type="text" placeholder="Enter image" name="img_url" onChange={handleChange} value={data.img_url} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>vedio</Form.Label>
      <Form.Control type="text" placeholder="Enter vedio" name="vedio_url" onChange={handleChange} value={data.vedio_url} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>phone_number</Form.Label>
      <Form.Control type="text" placeholder="Enter phone_number" name="phone_number" onChange={handleChange} value={data.phone_number}  />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>adresse</Form.Label>
      <Form.Control type="text" placeholder="Enter adresse" name="adresse" onChange={handleChange} value={data.adresse} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>description</Form.Label>
      <Form.Control type="text" placeholder="Enter description" name="description" onChange={handleChange} value={data.description}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>rate</Form.Label>
      <Form.Control type="number" placeholder="Enter rate" name="rate"  onChange={handleChange} value={data.rate} />
    </Form.Group>
    
    



    
    
    

    
   

        </Modal.Body>

       
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          { service?
          <Button variant="primary" onClick={()=>console.log({title:data.title,img_url:data.img_url,vedio_url:data.vedio_url,phone_number:data.phone_number,
            adresse:data.adresse,description:data.description,rate:Number(data.rate),createdAt:service.createdAt})}>
           Edit
          </Button>
          :
          <Button variant="primary" onClick={handleAdd}>
          Add
         </Button>
        }
        </Modal.Footer>
      </Modal>
    </>
    </div>
  )
}

export default Add_Edit