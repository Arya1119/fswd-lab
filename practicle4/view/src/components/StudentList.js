import React, { useEffect, useState } from "react";
import { Card, Container, Table, ButtonGroup, Button } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom'

export default function StudentList(props) {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  let getStudents = () => {
    axios
      .get("http://localhost:1119/api/studentList")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => alert(error));
    };
    
    let deleteStudent = (studentId) => {
      
    console.log(studentId);
    axios.delete("http://localhost:1119/api/deleteStudentList/"+studentId)
    .then(response=> {
      if (response.data !== null){
        props.showAlert("success", "Record deleted successfully")
        setStudents(students.filter(student=>student.sid!==studentId));
      }
    })
  }

  return (
    <div className="my-3">
      <Container>
        <Card.Header>
          <h3>Students List</h3>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Student Id</th>
                <th>Student Name</th>
                <th>Student Address</th>
                <th>Student MobileNo</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={4}>{students.length} Studnets Available!!!</td>
                </tr>
              ) : (
                students.map((student)=>
                <tr key={student.sid}>
                  <td>{student.sid}</td>
                  <td>{student.name}</td>
                  <td>{student.address}</td>
                  <td>{student.mobileno}</td>
                  <td>
                    <ButtonGroup>
                      <Link to={"/student/"+student.sid}><Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit}> Edit </FontAwesomeIcon></Button></Link>{ ' '}
                      {/* <Button size="sm" variant="outline-danger" onClick={deleteStudent.bind(student.sid)}><FontAwesomeIcon icon={faTrash}> Delete </FontAwesomeIcon></Button> */}
                      <Button size="sm" variant="outline-danger" onClick={()=>deleteStudent(student.sid)}><FontAwesomeIcon icon={faTrash}> Delete </FontAwesomeIcon></Button>
                    </ButtonGroup>
                  </td>
                </tr>
                )
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Container>
    </div>
  );
}
