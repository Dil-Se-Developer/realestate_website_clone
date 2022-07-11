import React from "react";
import logo from "../../assets/homeid_logo_white.png";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <div className="general_navbar">
      <img src={logo} alt="homeid_logo" />
      <div className="navbar_btn_group">
        <button className="navbar_btn">Login</button>
        <button className="navbar_btn register_btn">Register</button>
      </div>
    </div>
  );
};

export default Navbar;
