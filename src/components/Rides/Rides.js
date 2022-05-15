import React from "react";
import MapImage from "../../assets/image 1.svg";
import classes from "./Rides.module.css";
const Rides = ({
  id,
  city,
  state,
  map_url,
  destination_station_code,
  origin_station_code,
  station_path,
  date,
  station_code
}) => {
 

  return (
    <>
      <article className={classes.rides}>
        <div>
          <img src={map_url} alt="Google Map" />
        </div>
        <div className={classes.details}>
          <ul className={classes.rideDetails}>
            <li>
              <span>Ride Id : </span>
              <span>{id}</span>
            </li>
            <li>
              <span>Origin Station : </span>
              <span>{origin_station_code}</span>
            </li>
            <li>
              <span>station_path : </span>
              <span>{JSON.stringify(station_path)}</span>
            </li>
            <li>
              <span>Date : </span>
              <span>{date}</span>
            </li>
            <li>
              <span>Distance : </span>
              <span>{destination_station_code - station_code}</span>
            </li>
          </ul>
          <div className={classes.name}>
            <p>{city}</p>
            <p>{state}</p>
          </div>
        </div>
      </article>
    </>
  );
};

export default Rides;
