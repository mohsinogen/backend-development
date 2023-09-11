import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <Container>
      <Row className="mt-1 align-items-center justify-content-between">
        <Col className="py-3" xs={"12"} md={"8"}>
          <div className="d-flex align-items-center justify-content-start rounded px-3 border-radius-3 border border-secondary">
            <i className="me-3 fas fa-search" />
            <Form.Group style={{flex:1}} controlId="search">
              <Form.Control
                type="text"
                placeholder="Search contact"
              ></Form.Control>
            </Form.Group>
          </div>
        </Col>
        <Col className="d-grid gap-2 py-3" xs={"12"} md={"3"}>
          {user && (
            <Button
              size="lg"
              onClick={() => {
                navigate("/newcontact");
              }}
            >
              <i className="fas fa-plus"></i> Create Contact
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
