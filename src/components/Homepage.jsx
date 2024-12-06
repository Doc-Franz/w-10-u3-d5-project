import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const Homepage = () => {
  const [location, setLocation] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [locationId, setLocationId] = useState("");
  const [isInvalidLocation, setIsInvalidLocation] = useState("");

  const navigate = useNavigate();

  const fetchLocation = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},&APPID=d4c2d76fb040b48b6f8398d3e637e664`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Invalid location");
        }
      })
      .then((location) => {
        setLon(location.coord.lon);
        setLat(location.coord.lat);
        setLocationId(location.id);
        setIsInvalidLocation("");
      })
      .catch((err) => {
        console.log(err);
        setIsInvalidLocation("The location is not valid. Please enter a new value");
      });
  };

  useEffect(() => {
    if (location) {
      fetchLocation();
    }
  }, [location]);

  useEffect(() => {
    if (locationId) {
      navigate(`/details/${locationId}?lat=${lat}&lon=${lon}`);
    }
  }, [locationId]);

  const changeLocation = (inputLocation) => {
    setLocation(inputLocation);
  };

  return (
    <>
      <Navbar changeLocation={changeLocation} isInvalidLocation={isInvalidLocation} />
      <h1 className="text-center" style={{ paddingTop: "140px", color: "yellow", fontSize: "70px" }}>
        App Meteo
      </h1>
      <Container className="mt-4" style={{ paddingTop: "50px" }}>
        <Row className="mt-3 d-flex justify-content-between">
          <Col>
            <h1 style={{ fontSize: "100px" }}>
              8 <span style={{ fontSize: "40px" }}>°C</span>
            </h1>
          </Col>
          <Col className="text-center">
            {" "}
            <img src="https://cdn.icon-icons.com/icons2/1370/PNG/512/if-weather-3-2682848_90785.png" style={{ width: "100px", height: "100px" }} />
          </Col>
          <Col>
            <Row>
              <Col className="text-end fs-4">
                <span style={{ color: "gray" }}>Description: </span>
                clear sky
              </Col>
            </Row>
            <Row>
              <Col className="text-end fs-4">
                <span style={{ color: "gray" }}>Humidity: </span>
                52 %
              </Col>
            </Row>
            <Row>
              <Col className="text-end fs-4">
                <span style={{ color: "gray" }}>Wind: </span>
                3.4 km/h
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
