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

  // useEffect(() => {
  //   // Make a GET request to the SpaceX Flights API
  //   axios
  //     .get("https://api.spacexdata.com/v2/launches")
  //     .then((res) => {
  //       // Set the flights state with the response data
  //       setFlights(res.data);
  //     })
  //     .catch((err) => {
  //       // Handle any errors
  //       console.error(err);
  //     });
  // }, []);

  // const flights = [
  //   {
  //     flight_number: 23,
  //     mission_name: "sdf",
  //   },
  //   {
  //     flight_number: 342,
  //     mission_name: "asfewg",
  //   },
  // ];
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
