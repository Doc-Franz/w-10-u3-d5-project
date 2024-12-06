import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Search, Clock } from "react-bootstrap-icons";

const Navbar = (props) => {
  const date = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleSubmit = (e) => {
    e.preventDefault();
    props.changeLocation(e.target.elements.searchLocation.value);
  };

  return (
    <Container className="fixed-top mt-4">
      <Row className="d-flex justify-content-between align-items-start">
        <Col className="col-4 d-flex align-items-center">
          <Form onSubmit={handleSubmit} className="d-flex align-items-center">
            <Form.Label htmlFor="searchLocation">
              <Search className="me-3" style={{ cursor: "pointer", width: "25px", height: "25px" }} />
            </Form.Label>
            <Form.Control type="text" id="searchLocation" className="me-3" autoComplete="off" />
            <Button className="btn btn-info" type="submit">
              Search
            </Button>
          </Form>
        </Col>
        <Col className="d-flex justify-content-end align-items-start">
          <Clock color="gray" className="me-3 mt-1" style={{ cursor: "pointer", width: "25px", height: "25px" }} />
          <p className="fs-4">
            {days[date.getDay()]} {months[date.getMonth()]} {date.getFullYear()}
          </p>
        </Col>
      </Row>
      {props.isInvalidLocation && <Alert variant="danger">{props.isInvalidLocation}</Alert>}
    </Container>
  );
};

export default Navbar;
