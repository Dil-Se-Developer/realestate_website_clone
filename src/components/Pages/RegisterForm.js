import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "../UI/FormInput";
import "./RegisterForm.css";

const RegisterForm = (props) => {
  const intialValues = {
    account: "customer",
    firstname: "",
    lastname: "",
    gender: "male",
    mobileno: "",
    emailid: "",
    city: "",
    country: "",
    password: "",
  };

  const Navigate = useNavigate();
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const registerHandler = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
      axios
        .get(`http://localhost:5000/${formValues.account}`)
        .then((responses) => responses.data)
        .then((usersData) => {
          let usersEmail = usersData.map((user) => user.emailid);
          return usersEmail.includes(formValues.emailid);
        })
        .then((userExist) => {
          if (userExist) {
            alert("User is already exit");
          } else {
            axios
              .post(`http://localhost:5000/${formValues.account}`, formValues)
              .then(() => {
                if (formValues.account === 'customer'){
                  // props.handleLogin()
                  Navigate("/");
              } else {
                Navigate('/agent');
              }})
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formErrors]);

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
    <>
      <div className="form_card">
        <form>
        <p className="radio_heading">Account Type :  </p>
          <div className="form_radio_group">
            <FormInput
              inputLabel="Customer"
              inputType="radio"
              inputName="account"
              inputValue="customer"
              onHandleChange={handleChange}
              // errorMessage={formErrors.lastname}
              customClass={"form_radio"}
              checked={formValues.account === 'customer'}
            />

            <FormInput
              inputLabel="Agent"
              inputType="radio"
              inputName="account"
              inputValue="agent"
              onHandleChange={handleChange}
              // errorMessage={formErrors.lastname}
              customClass={"form_radio"}
              checked={formValues.account === 'agent'}
            />
          </div>

          <FormInput
            inputLabel="First Name: "
            inputType="text"
            inputName="firstname"
            inputValue={formValues.firstname}
            onHandleChange={handleChange}
            errorMessage={formErrors.firstname}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <FormInput
            inputLabel="Last Name: "
            inputType="text"
            inputName="lastname"
            inputValue={formValues.lastname}
            onHandleChange={handleChange}
            errorMessage={formErrors.lastname}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <p className="radio_heading">Gender:  </p>
          <div className="form_radio_group">
            <FormInput
              inputLabel="Male"
              inputType="radio"
              inputName="gender"
              inputValue="male"
              onHandleChange={handleChange}
              // errorMessage={formErrors.lastname}
              customClass={"form_radio"}
              checked={formValues.gender === 'male'}
            />

            <FormInput
              inputLabel="Female"
              inputType="radio"
              inputName="gender"
              inputValue="female"
              onHandleChange={handleChange}
              // errorMessage={formErrors.lastname}
              customClass={"form_radio"}
              checked={formValues.gender === 'female'}
            />
          </div>

          <FormInput
            inputLabel="Mobile No: "
            inputType="number"
            inputName="mobileno"
            inputValue={formValues.mobileno}
            onHandleChange={handleChange}
            errorMessage={formErrors.mobileno}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <FormInput
            inputLabel="Email ID: "
            inputType="email"
            inputName="emailid"
            inputValue={formValues.emailid}
            onHandleChange={handleChange}
            errorMessage={formErrors.emailid}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <FormInput
            inputLabel="City: "
            inputType="text"
            inputName="city"
            inputValue={formValues.city}
            onHandleChange={handleChange}
            errorMessage={formErrors.city}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <FormInput
            inputLabel="Country: "
            inputType="text"
            inputName="country"
            inputValue={formValues.country}
            onHandleChange={handleChange}
            errorMessage={formErrors.country}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <FormInput
            inputLabel="Password: "
            inputType="password"
            inputName="password"
            inputValue={formValues.password}
            onHandleChange={handleChange}
            errorMessage={formErrors.password}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <div className="form_input login_btn">
            <button onClick={registerHandler} className="form_btn">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
