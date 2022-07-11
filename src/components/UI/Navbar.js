import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/homeid_logo_white.png";
import "./Navbar.css";

const Navbar = (props) => {
  const Navigate = useNavigate();

  const loginHandler = () => {
    Navigate('/login');
  }

  const registerHandler = () => {
    Navigate('/register');
  }

  return (
    <div className="general_navbar">
      <img src={logo} alt="homeid_logo" />
      <div className="navbar_btn_group">
        <button onClick={loginHandler} className="navbar_btn">Login</button>
        <button onClick={registerHandler} className="navbar_btn register_btn">Register</button>
      </div>
    </div>
  );
};

export default Navbar;
