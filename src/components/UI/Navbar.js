import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/homeid_logo_white.png";
import { loginAgentActions } from '../../redux/actions/loginAgentActions'
import { agentStautsActions } from '../../redux/actions/agentStatusActions'
import { FaLaptopHouse } from "react-icons/fa";
import "./Navbar.css";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const loginStatus = useSelector((state) => state.loginStatus.loginStatus);
  const agentStatus = useSelector((state) => state.agentStatus.agentStatus);
  const singleUserData = useSelector((state) => state.singleUserData.singleUserData);

  const userFirstName = singleUserData.firstname;
  // console.log(userFirstName);
  // console.log(singleUserData);
  // console.log(loginStatus, 'login');
  // console.log(agentStatus, 'agentStatus');


  const loginHandler = () => {
    Navigate('/login');
  }

  const registerHandler = () => {
    Navigate('/register');
  }

  const addListingHandler = () => {
    Navigate('agent/addlisting');
  }

  const handleSelectChange = (e) => {
    let { value } = e.target
    if (value === 'edit') {
      Navigate('/editprofile');
    } else if (value === 'logout') {
      Navigate('/login');
      dispatch(loginAgentActions(false))
      dispatch(agentStautsActions(false))
    }
  }

  return (
    <div className="general_navbar">
      <img src={logo} alt="homeid_logo" />
      {!loginStatus ? <div className="navbar_btn_group">
        <button onClick={loginHandler} className="navbar_btn">Login</button>
        <button onClick={registerHandler} className="navbar_btn register_btn">Register</button>
      </div> : <div className="user_profile">
        <div className="user_profile_logo">{userFirstName[0]}</div>
        <div><select className="user_profile_dropdown" name="user" id="user" onChange={handleSelectChange}>
          <option value="greetings">Hi,{userFirstName}!</option>
          <option value="edit">Edit Profile</option>
          <option value="logout">Logout</option>
        </select></div>{agentStatus ? <div><button className="addlisting_btn" onClick={addListingHandler}>Add Listing <FaLaptopHouse size={'1rem'}/></button></div> : <div></div>}
      </div>}
    </div>
  );
};

export default Navbar;
