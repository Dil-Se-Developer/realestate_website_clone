import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserAgentAction } from "../../redux/actions/fetchUserAgentDataAction";
import { loginAgentActions } from '../../redux/actions/loginAgentActions';
import { agentStautsActions } from '../../redux/actions/agentStatusActions';
import { singleUserDataActions } from "../../redux/actions/singleUserDataActions";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../UI/FormInput";
import "./LoginForm.css";

const LoginForm = (props) => {
  const dispatch = useDispatch();

  const intialValues = {
    account: "customer",
    emailid: "",
    password: "",
  };

  const Navigate = useNavigate();
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const usersData = useSelector((state) => state.fetchUserAgent.UserAgentData);
  // const agentStatus = useSelector((state) => state.agentStatus.agentStatus);
  // console.log(agentStatus, 'agentStatus');
  // console.log(usersData);

  const loginHandler = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));

    if (Object.keys(validate(formValues)).length === 0) {
      const usersEmail = usersData.map((user) => user.emailid);
      const usersPassword = usersData.map((user) => user.password);
      const userExist = usersEmail.includes(formValues.emailid) && usersPassword.includes(formValues.password);

      if (userExist) {
        const findUser = usersData.find((userData) => userData.emailid === formValues.emailid)
        dispatch(singleUserDataActions(findUser))
        // console.log(findUser, "find"); 
        // console.log(formValues.account, 'formval');
        if (formValues.account === 'customer' && findUser.account === 'customer') {
          dispatch(loginAgentActions(true))
          Navigate("/");
        } else if (formValues.account === 'agent' && findUser.account === 'agent') {
          dispatch(loginAgentActions(true))
          dispatch(agentStautsActions(true))
          Navigate("/agent");
        } else {
          alert("Kindly Check Account Type")
        }
      } else {
        alert("Kindly Check Emailid, and Password");
      }

    };
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // console.log(formValues);

  useEffect(() => {
    dispatch(fetchUserAgentAction());
  }, [dispatch]);


  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.emailid) {
      errors.emailid = "Emailid is required!";
    } else if (!regex.test(values.emailid)) {
      errors.emailid = "This is not a valid email format!";
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
      <div className="form_card login_card">
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
              checked={formValues.account === "customer"}
            />

            <FormInput
              inputLabel="Agent"
              inputType="radio"
              inputName="account"
              inputValue="agent"
              onHandleChange={handleChange}
              // errorMessage={formErrors.lastname}
              customClass={"form_radio"}
              checked={formValues.account === "agent"}
            />
          </div>

          <FormInput
            inputLabel="Email ID :"
            inputType="email"
            inputName="emailid"
            inputValue={formValues.emailid}
            errorMessage={formErrors.emailid}
            onHandleChange={handleChange}
            errorClass={"error_para"}
            customClass={"form_input"}
          />
          <FormInput
            inputLabel="Password :"
            inputType="password"
            inputName="password"
            inputValue={formValues.password}
            errorMessage={formErrors.password}
            onHandleChange={handleChange}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <div className="form_input login_btn">
            <button className="form_btn" onClick={loginHandler}>
              Login
            </button>
          </div>
        </form>
      </div>
      <Link className="form_card navigate_signup" to="/register">
        Create an account
      </Link>
    </>
  );
};

export default LoginForm;
