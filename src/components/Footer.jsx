import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="fixed-bottom mb-3">
      <Row className="d-flex">
        <Col>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Ilmeteo_logo.png/200px-Ilmeteo_logo.png"
            style={{ width: "100px", height: "100px" }}
          />
        </Col>
        <Col className="text-secondary d-flex align-items-center ">
          {" "}
          - P.IVA xxxxxxxx - Iscrizione registro delle imprese di Milano, 10/01/2019 - R.E.A. xxxxxx - Gruppo yyyyy Srl
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
