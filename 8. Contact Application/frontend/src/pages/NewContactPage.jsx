import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { Form, Button, Container } from "react-bootstrap";

function NewContactPage() {
  const [loading, setLoading] = useState(false);

  const submitHandler = () => {
   console.log('hi');
  };

  const navigate = useNavigate();

  return (
    <Container>
      <Button className="my-3" onClick={()=> navigate(-1)}><i className="fas fa-chevron-left" />  Go Back</Button>
      <FormContainer>
        <h1>New Contact</h1>
      </FormContainer>
      {/* <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter name"></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
              ></Form.Control>
              <Form.File id="image-file" label="Choose File" custom></Form.File>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="remark">
              <Form.Label>Remark</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Create
            </Button>
          </Form>
        )}
      </FormContainer> */}
    </Container>
  );
}

export default NewContactPage;
