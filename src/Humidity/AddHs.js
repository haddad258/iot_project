import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody,  Form } from 'reactstrap';
import CameraAddH from './CameraAddH'

const AddHs = (props) => {
    const {
      buttonLabel,
      className
    } = props;
  
    const [modal, setModal] = useState(false);
    const [unmountOnClose] = useState(true);
  
    const toggle = () => setModal(!modal);
   
  
    return (
        <div>
            <Form inline onSubmit={(e) => e.preventDefault()}>
               
                
                <Button color="info" onClick={toggle}>{buttonLabel} ADD Humidity SENSOR</Button>
            </Form>
            <Modal isOpen={modal} toggle={toggle} className={className} unmountOnClose={unmountOnClose}>
                <ModalHeader toggle={toggle}>ADD Humidity SENSOR</ModalHeader>
                <ModalBody>
                   
                <CameraAddH></CameraAddH>
               
                </ModalBody>
              
            </Modal>
        </div>
    );
}


export default AddHs;