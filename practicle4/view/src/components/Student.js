import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import {  useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Student(props) {
  const [sid, setSid] = useState(null);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [mobileno, setMobileno] = useState(null);

  const { studentSid } = useParams(); // Get the Path Parameter from the URL
  const navigate = useNavigate();

  useEffect(() => {
    if (studentSid) {
      axios
        .get("http://localhost:1119/api/studentList/" + studentSid)
        .then((response) => {
          if (response.data != null) {
            setSid(response.data.sid);
            setName(response.data.name);
            setAddress(response.data.address);
            setMobileno(response.data.mobileno);
          }
        })
        .catch((error) => props.showAlert("danger", "Error"));
    }
  }, []);

  let student = {
    sid:sid,
    name: name,
    address: address,
    mobileno: mobileno,
  };

  let textChanged = (event) => {
    if (event.target.name === "sid") {
      setSid(event.target.value);
    } else if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "address") {
      setAddress(event.target.value);
    } else if (event.target.name === "mobileno") {
      setMobileno(event.target.value);
    }
  };

  let saveStudent = (event) => {
    event.preventDefault();
    
      axios
        .post("http://localhost:1119/api/submitStudent", student)
        .then((response) => {
          if (response.data != null) {
            props.showAlert("success", "Record added successfully");
          }
        })
        .catch((error) => props.showAlert("danger", "Error"));
  };

  let updateStudent = (event) => {
    event.preventDefault();
    axios.put("http://localhost:1119/api/updateStudent/" + studentSid, student).then((response) => {
      if (response.data != null) {
        props.showAlert("success", "Record updated successfully");
        navigate("/listStudents"); // Navigate to Students List Components
      }
    });
  };

  return (
    <div className="my-3">
      <Container>
        <Card>
          <Form onSubmit={studentSid != null ? updateStudent : saveStudent}>
            <Card.Header>
              <strong>{studentSid!=null? "Update Student Information":"Add Student Information"}</strong>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Id</Form.Label>
                <Form.Control
                  name="sid"
                  value={sid}
                  type="text"
                  placeholder="Enter id"
                  onChange={textChanged}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={name}
                  type="text"
                  placeholder="Enter name"
                  onChange={textChanged}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  value={address}
                  type="text"
                  placeholder="Enter address"
                  onChange={textChanged}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  name="mobileno"
                  value={mobileno}
                  type="text"
                  placeholder="Enter mobile no"
                  onChange={textChanged}
                />
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" type="submit">
                {studentSid != null ? "Update" : "Submit"}
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
