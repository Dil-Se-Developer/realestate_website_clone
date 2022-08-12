import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchUserAgentAction,
//   updateUserData,
// } from "../../redux/actions/fetchUserAgentDataAction";
// import { loginAgentActions } from '../../redux/actions/loginAgentActions';
// import { agentStautsActions } from "../../redux/actions/agentStatusActions";
// import { singleUserDataActions } from "../../redux/actions/singleUserDataActions";
import {
  setAgentStatus,
  setSingleUserData,
  fetchUserAgentData,
  updateUserData,
} from "../../redux_tookit/slices/userAgentDataSlice";
import { useNavigate } from "react-router-dom";
import FormInput from "../UI/FormInput";
import "./EditProfile.css";

const EditProfile = () => {
  const dispatch = useDispatch();

  const Navigate = useNavigate();
  const [existingValues, setExistingValues] = useState({
    account: "",
    firstname: "",
    lastname: "",
    gender: "",
    mobileno: "",
    emailid: "",
    city: "",
    country: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const usersData = useSelector((state) => state.userAgentData.UserAgentData);
  const singleUserData = useSelector(
    (state) => state.userAgentData.singleUserData
  );

  const filterUsersData = usersData.filter(
    (userData) => userData.emailid !== singleUserData.emailid
  );
  // const error = useSelector((state) => state.fetchUserAgent.FetchError);

  useEffect(() => {
    setExistingValues(singleUserData);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExistingValues((prevExistingValues) => {
      return { ...prevExistingValues, [name]: value };
    });
  };

  // console.log(existingValues);

  const registerHandler = (event) => {
    event.preventDefault();
    setFormErrors(validate(existingValues));
    const userEmaild = filterUsersData.map((user) => user.emailid);
    const userEmaildExist = userEmaild.includes(existingValues.emailid);

    if (userEmaildExist) {
      alert("user already exit");
      return;
    }

    if (Object.keys(validate(existingValues)).length === 0) {
      dispatch(updateUserData(existingValues));
      dispatch(setSingleUserData(existingValues));
      if (existingValues.account === "customer") {
        // dispatch(loginAgentActions(true))
        dispatch(setAgentStatus(false));
        Navigate("/");
      } else {
        // dispatch(loginAgentActions(true))
        dispatch(setAgentStatus(true));
        Navigate("/agent");
      }
    }
  };

  useEffect(() => {
    dispatch(fetchUserAgentData());
  }, []);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstname) {
      errors.firstname = "Firstname is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Lastname is required!";
    }
    if (!values.mobileno) {
      errors.mobileno = "Mobileno is required!";
    } else if (values.mobileno.length !== 10) {
      errors.mobileno = "Mobileno cannot exceed more than 10 characters";
    }
    if (!values.emailid) {
      errors.emailid = "Emailid is required!";
    } else if (!regex.test(values.emailid)) {
      errors.emailid = "This is not a valid email format!";
    }
    if (!values.city) {
      errors.city = "City is required!";
    }
    if (!values.country) {
      errors.country = "Country is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="editprofile_background_img">
      <div className="form_card">
        <form>
          <p className="radio_heading">Account Type : </p>
          <div className="form_radio_group">
            <FormInput
              inputLabel="Customer"
              inputType="radio"
              inputName="account"
              inputValue="customer"
              onHandleChange={handleChange}
              // errorMessage={formErrors.lastname}
              customClass={"form_radio"}
              checked={existingValues.account === "customer"}
            />

            <FormInput
              inputLabel="Agent"
              inputType="radio"
              inputName="account"
              inputValue="agent"
              onHandleChange={handleChange}
              // errorMessage={formErrors.lastname}
              customClass={"form_radio"}
              checked={existingValues.account === "agent"}
            />
          </div>

          <FormInput
            inputLabel="First Name: "
            inputType="text"
            inputName="firstname"
            inputValue={existingValues.firstname}
            onHandleChange={handleChange}
            errorMessage={formErrors.firstname}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <FormInput
            inputLabel="Last Name: "
            inputType="text"
            inputName="lastname"
            inputValue={existingValues.lastname}
            onHandleChange={handleChange}
            errorMessage={formErrors.lastname}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <p className="radio_heading">Gender: </p>
          <div className="form_radio_group">
            <FormInput
              inputLabel="Male"
              inputType="radio"
              inputName="gender"
              inputValue="male"
              onHandleChange={handleChange}
              // errorMessage={formErrors.lastname}
              customClass={"form_radio"}
              checked={existingValues.gender === "male"}
            />

            <FormInput
              inputLabel="Female"
              inputType="radio"
              inputName="gender"
              inputValue="female"
              onHandleChange={handleChange}
              // errorMessage={formErrors.lastname}
              customClass={"form_radio"}
              checked={existingValues.gender === "female"}
            />
          </div>

          <FormInput
            inputLabel="Mobile No: "
            inputType="number"
            inputName="mobileno"
            inputValue={existingValues.mobileno}
            onHandleChange={handleChange}
            errorMessage={formErrors.mobileno}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <FormInput
            inputLabel="Email ID: "
            inputType="email"
            inputName="emailid"
            inputValue={existingValues.emailid}
            onHandleChange={handleChange}
            errorMessage={formErrors.emailid}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <FormInput
            inputLabel="City: "
            inputType="text"
            inputName="city"
            inputValue={existingValues.city}
            onHandleChange={handleChange}
            errorMessage={formErrors.city}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <FormInput
            inputLabel="Country: "
            inputType="text"
            inputName="country"
            inputValue={existingValues.country}
            onHandleChange={handleChange}
            errorMessage={formErrors.country}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <FormInput
            inputLabel="Password: "
            inputType="password"
            inputName="password"
            inputValue={existingValues.password}
            onHandleChange={handleChange}
            errorMessage={formErrors.password}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <div className="form_input login_btn">
            <button onClick={registerHandler} className="form_btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
