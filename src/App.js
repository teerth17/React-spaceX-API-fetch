import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v2/launches")
      .then((res) => {
        setFlights(res.data);
      })
      .catch((err) => {
        console.log("Error while fetching spaceX launch API", err);
      });
  }, []);

  return (
    <ul className="flights-list">
      {flights
        .slice(0)
        .reverse()
        .map((flight) => (
          <li key={flight.flight_number}>
            <div className="flight-info">
              <img
                src={flight.links.mission_patch_small}
                alt={flight.mission_name}
              />

              <div className="flight-data">
                <h2>{flight.mission_name}</h2>
                <p> Flight Number: {flight.flight_number}</p>
                <p> Launch Date (UTC) : {flight.launch_date_utc}</p>
                <p> Flight Details: {flight.details} </p>
                <a href={flight.links.article_link}> Read about launch</a>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default App;
