import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Clock, GeoAlt } from "react-bootstrap-icons";
import { Col, Container, Row } from "react-bootstrap";

const Details = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const lat = params.get("lat");
  const lon = params.get("lon");

  const date = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [weather, setWeather] = useState([]);
  const [cityName, setCityName] = useState("");

  const fetchLocation = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d4c2d76fb040b48b6f8398d3e637e664`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("errore nella chiamata");
        }
      })
      .then((weather) => {
        setCityName(weather.city.name);
        setWeather(weather.list);
        sessionStorage.setItem("weatherData", JSON.stringify(weather.list));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchLocation();
  }, [lat, lon]);

  return (
    <Container className="mt-4">
      <Row className="d-flex justify-content-between align-items-start">
        <Col className="d-flex align-items-center">
          <Link to="/">
            <GeoAlt color="gray" className="me-3 mb-3 search-location" style={{ cursor: "pointer", width: "25px", height: "25px" }} />
          </Link>
          <p className="fs-4">{cityName}</p>
        </Col>
        <Col className="d-flex justify-content-end align-items-start">
          <Clock color="gray" className="me-3 mt-1" style={{ cursor: "pointer", width: "25px", height: "25px" }} />
          <p className="fs-4">
            {days[date.getDay()]} {months[date.getMonth()]} {date.getFullYear()}
          </p>
        </Col>
      </Row>
      {weather.length > 0 && (
        <Row className="mt-3 d-flex justify-content-between">
          <Col>
            <h1 style={{ fontSize: "100px" }}>
              {Math.floor(weather[0].main.temp - 273.15)} <span style={{ fontSize: "40px" }}>°C</span>
            </h1>
          </Col>
          <Col className="text-center">
            {" "}
            <img src={`http://openweathermap.org/img/wn/${weather[0].weather[0].icon}.png`} style={{ width: "150px", height: "150px" }} />
          </Col>
          <Col>
            <Row>
              <Col className="text-end fs-4">
                <span style={{ color: "gray" }}>Description: </span>
                {weather[0].weather[0].description}
              </Col>
            </Row>
            <Row>
              <Col className="text-end fs-4">
                <span style={{ color: "gray" }}>Humidity: </span>
                {weather[0].main.humidity} %
              </Col>
            </Row>
            <Row>
              <Col className="text-end fs-4">
                <span style={{ color: "gray" }}>Wind: </span>
                {weather[0].wind.speed} km/h
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <Row className="d-flex flex-row" style={{ marginTop: "100px" }}>
        {weather.map(
          (dayweather, index) =>
            dayweather.dt_txt.endsWith("12:00:00") && (
              <Col key={index} className="d-flex flex-column fs-4 text-center">
                <p>{index === 0 ? "Today" : new Date(new Date().setDate(new Date().getDate() + index)).toLocaleDateString("en-US", { weekday: "long" })}</p>
                <img src={`http://openweathermap.org/img/wn/${dayweather.weather[0].icon}.png`} alt="Weather icon" />
                <p>{Math.floor(dayweather.main.temp_max - 273.15)} °C</p>
                <p>{Math.floor(dayweather.main.temp_min - 273.15)} °C</p>
              </Col>
            )
        )}
      </Row>
    </Container>
  );
};

export default Details;
