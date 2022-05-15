import RideDetails from "./components/RidesDetail/RidesDetail";
import Header from "./components/Header/Header";
import React, { useEffect, useState } from "react";

const App = () => {
  const [ridesData, setRidesData] = useState([]);
  const [user, setUser] = useState({});
  const fetchRidesData = () => {
    document.body.classList.add("busy_cursor");
    fetch("https://assessment.api.vweb.app/rides").then((response) => {
      response.json().then((data) => {
        // console.log(data);
        document.body.classList.remove("busy_cursor");
        setRidesData(data);
      });
    });
  };
  const fetchUserData = () => {
    document.body.classList.add("busy_cursor");
    fetch("https://assessment.api.vweb.app/user").then((response) => {
      response.json().then((data) => {
        // console.log(data);
        document.body.classList.remove("busy_cursor");
        setUser(data);
      });
    });
  };
  useEffect(() => {
    fetchRidesData();
    fetchUserData();
  }, []);
  return (
    <div className="App">
      <Header user={user} /> 
      <RideDetails ridesData={ridesData} station_code={user.station_code} />
    </div>
  );
};  
export default App;
