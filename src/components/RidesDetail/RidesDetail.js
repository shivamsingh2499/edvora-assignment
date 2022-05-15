import React, { useMemo, useState } from "react";
import FilterIcon from "../../assets/Vector.png";
import Rides from "../Rides/Rides";
import classes from "./RidesDetail.module.css";
import Filters from "../Filters";
const RideDetails = ({ ridesData, station_code }) => {
  const [active, setActive] = useState(1);
  const [showfilters, setShowFilters] = useState(false);
  const [appliedFilter, setAppliedFilter] = useState({
    state: "",
    city: "",
  });
  console.log(station_code);
  let currentTime = new Date();
  const showfilter = () => {
    setShowFilters((prev) => !prev);
  };
  let cities = useMemo(() => {
    let data = [],
      rides;
    if (appliedFilter.state) {
      rides = ridesData.filter((ride) => ride.state === appliedFilter.state);
    } else {
      rides = ridesData;
    }
    if (rides.length) {
      rides.forEach((ride) => {
        if (!data.includes(ride.city)) {
          data.push(ride.city);
        }
      });
    }
    return data.sort();
  }, [ridesData, appliedFilter]);

  let states = useMemo(() => {
    let data = [];
    if (ridesData.length) {
      ridesData.forEach((ride) => {
        if (!data.includes(ride.state)) {
          data.push(ride.state);
        }
      });
    }

    return data.sort();
  }, [ridesData]);

  const Data = useMemo(() => {
    let rides =
      active === 1
        ? ridesData.filter((ride) =>
            ride.station_path.reduce((a, b) => {
              return (
                Math.abs(b - station_code) < Math.abs(a - station_code) && b
              );
            })
          )
        : active === 2
        ? ridesData.filter(function (ride) {
            return ride && new Date(ride.date) - currentTime > 0;
          })
        : ridesData.filter(function (ride) {
            return ride && new Date(ride.date) - currentTime < 0;
          });

    if (appliedFilter.state || appliedFilter.city) {
      if (appliedFilter.state && appliedFilter.city) {
        console.log(appliedFilter);
        return rides.filter(
          (ride) =>
            ride.state === appliedFilter.state &&
            ride.city === appliedFilter.city
        );
      } else if (appliedFilter.city) {
        return rides.filter((ride) => ride.city === appliedFilter.city);
      } else {
        return rides.filter((ride) => ride.state === appliedFilter.state);
      }
    } else {
      console.log(rides);
      return rides;
    }
  }, [ridesData, appliedFilter, active, station_code]);
  
  return (
    <>
      <div className={classes.filterHeader}>
        <div className={classes.filterRide}>
          <div className={classes.rides}>
            <h3
              className={active === 1 ? classes.active : ""}
              onClick={() => setActive(1)}
            >
              Nearest rides
            </h3>
            <h3
              className={active === 2 ? classes.active : ""}
              onClick={()=>setActive(2)}
            >
              Upcoming rides(
              {
                ridesData.filter(function (ride) {
                  return ride && new Date(ride.date) - currentTime > 0;
                }).length
              }
              )
            </h3>
            <h3
              className={active === 3 ? classes.active : ""}
              onClick={() => setActive(3)}
            >
              Past rides(
              {
                ridesData.filter(function (ride) {
                  return ride && new Date(ride.date) - currentTime < 0;
                }).length
              }
              )
            </h3>
          </div>
          <div className={classes.filter} onClick={showfilter}>
            <div>
              <img src={FilterIcon} alt="Filter Symbol" />
            </div>
            <h3>Filter</h3>
          </div>
        </div>
        {showfilters && (
          <Filters
            states={states}
            cities={cities}
            setAppliedFilter={setAppliedFilter}
            setShowFilters={setShowFilters}
            appliedFilter={appliedFilter}
          />
        )}
        {Data.length > 0 ? (
          Data.map((ride, index) => (
            <Rides
              city={ride.city}
              date={ride.date}
              destination_station_code={ride.destination_station_code}
              id={ride.id}
              key={index}
              map_url={ride.map_url}
              origin_station_code={ride.origin_station_code}
              state={ride.state}
              station_path={ride.station_path}
              station_code={station_code}
            />
          ))
        ) : (
          <h1 className={classes.noRidesFound}>NO RIDES AVAILABLE</h1>
        )}
      </div>
    </>
  );
};

export default RideDetails;
