import React from "react";
import ProfileImage from "../../assets/Rectangle.png";
import classes from "./Header.module.css";
const Header = ({user}) => {
  return (
    <>
      <div className={classes.header}>
        <div>
          <h1>Edvora</h1>
        </div>
        <div className={classes.profile}>
          <h2>{user.name}</h2>
          <div className={classes.profileImage}>
            <img src={user.url} alt="User Profile" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
