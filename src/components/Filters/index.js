import React, { useState } from "react";
import classes from "./index.module.css";
import downArrow from "../../assets/Polygon 29.png";

function Filters({ states, cities, setAppliedFilter, appliedFilter }) {
  const [showState, setShowState] = useState(false);
  const [showCities, setShowCities] = useState(false);
  function handleSelectionState(state) {
    setAppliedFilter({ city: "", state });
    setShowState(false);
  }
  function handleSelectionCity(city) {
    setAppliedFilter((prev) => ({ ...prev, city }));
    setShowCities(false);
  }
  const ShowState = () => {
    setShowState((prev) => !showState);
    setShowCities(false);
  };
  const ShowCities = () => {
    setShowCities((prev) => !showCities);
    setShowState(false);
  };

  return (
      <div className={classes.searchFilter}>
        <h2>Filters</h2>
        <div>
          <div>
            <div className={classes.filterOption} onClick={ShowState}>
              <span>{appliedFilter.state ? appliedFilter.state : "State"}</span>
              <img
                className={showState ? classes.active : ""}
                src={downArrow}
                alt="DownArrow for State"
              />
            </div>

            {showState && (
              <ul className={classes.filterList}>
                {states.map((item, index) => (
                  <li key={index} onClick={() => handleSelectionState(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <div className={classes.filterOption} onClick={ShowCities}>
              <span>{appliedFilter.city ? appliedFilter.city : "City"}</span>
              <img
                className={showCities ? classes.active : ""}
                src={downArrow}
                alt="DownArrow for City"
              />
            </div>
            {showCities && (
              <ul className={classes.filterList}>
                {cities.map((item, index) => (
                  <li key={index} onClick={() => handleSelectionCity(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
  );
}

export default Filters;
