import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import "../App.css";
const API_URL = "https://mocki.io/v1/ddb7e0a8-e218-4e36-b1be-b902cdb1c098";

const Teams = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data from the API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter data based on search term
  useEffect(() => {
    const filteredResults = data.filter(
      (item) =>
        item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [searchTerm, data]);

  const renderCard = (person) => (
    <Col key={person.email} xs={12} sm={6} md={3} className="mb-3">
      <Card
        style={{ width: "250px", height: "80px", borderRadius: "15px" }}
        className="shadow card-hover"
      >
        <div className="d-flex justify-content-between align-items-center">
          <Card.Img
            variant="top"
            src={person.img}
            style={{ width: "55px", height: "55px", borderRadius: "50%" }}
            className="p-1"
          />
          <Card.Body className="overflow-hidden">
            <Card.Title
              className="text-nowrap  font-weight-bold"
              style={{ fontSize: "15px" }}
            >
              {`${person.first_name} ${person.last_name}`}
            </Card.Title>
            <Card.Text className="text-nowrap" style={{ fontSize: "12px" }}>
              {person.email}
            </Card.Text>
          </Card.Body>
        </div>
      </Card>
    </Col>
  );

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center p-2 container-header">
        <div className="text-white mx-4">
          <h3>Teams</h3>
        </div>
        <div className="mx-4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>

      <div className="p-3 container-body">
        <h5 className="p-2 title">Administrators</h5>
        <Row>
          {filteredData.map(
            (person) => person.role === "admin" && renderCard(person)
          )}
        </Row>
        <hr />
        <h5 className="p-2 title">Members</h5>
        <Row>
          {filteredData.map(
            (person) => person.role === "member" && renderCard(person)
          )}
        </Row>
      </div>
    </Container>
  );
};

export default Teams;
