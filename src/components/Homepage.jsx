import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

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
        // console.log(location.weather[0].description);
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
    </>
  );
};

export default Homepage;
