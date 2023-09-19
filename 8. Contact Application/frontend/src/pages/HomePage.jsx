import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { baseURL } from "../utils/env";
import axios from "axios";

function HomePage() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [contactList, setContactList] = useState([]);

  const getContacts = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.get(baseURL + "/api/contacts", config);
      setContactList(res.data.data.contactList);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data.remark) {
        setError(error.response.data.remark);
      } else {
        setError(error.message);
      }
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Container>
      <Row className="mt-1 align-items-center justify-content-between">
        <Col className="py-3" xs={"12"} md={"8"}>
          <div className="d-flex align-items-center justify-content-start rounded px-3 border-radius-3 border border-secondary">
            <i className="me-3 fas fa-search" />
            <Form.Group style={{ flex: 1 }} controlId="search">
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

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      {contactList.length >= 1 && (
        <Table hover striped responsive>
          <thead>
            <tr>
              <th></th>

              <th>Firstname</th>
              <th>Lastname</th>
              <th>Number</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {contactList.map((item, index) => (
              <tr onClick={()=>{
                navigate(`/contacts/${item._id}`)
              }} key={index}>
                <td>
                  <Image
                    style={{
                      height: "60px",
                      width: "60px",
                      objectFit: "cover",
                    }}
                    src={
                      item.profile
                        ? item.profile
                        : require("../assets/user.png")
                    }
                    roundedCircle
                  />
                </td>
                <td key={index}>{item?.firstname}</td>
                <td key={index}>{item?.lastname}</td>
                <td key={index}>{item?.number}</td>
                <td key={index}>{item?.gender}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default HomePage;
