import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { agentStautsActions } from '../../redux/actions/agentStatusActions';
// import {
//   addProduct,
//   updateProduct,
// } from "../../redux/actions/fetchProductsAction";
import { setAgentStatus } from "../../redux_tookit/slices/userAgentDataSlice";
import {
  addProductData,
  updateProductData,
  fetchAgentProductsData,
} from "../../redux_tookit/slices/realestateDataSlice";
import FormInput from "../UI/FormInput";
import "./PropertyForm.css";

const AddListing = ({ isEditing }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const singleUserData = useSelector(
    (state) => state.userAgentData.singleUserData
  );

  const [formValues, setFormValues] = useState({
    agentId: singleUserData.id,
    propertytype: "sale",
    propertyname: "",
    propertyaddress: "",
    propertysq: "",
    bedrooms: "",
    price: "",
    postimg: "",
  });

  const [errorObj, setErrorObj] = useState({
    propertyname: false,
    propertyaddress: false,
    propertysq: false,
    bedrooms: false,
    price: false,
    postimg: false,
  });

  const postHandler = (event) => {
    event.preventDefault();
    validate(formValues);
    if (!Object.values(formValues).includes("")) {
      isEditing
        ? dispatch(updateProductData(formValues))
            .then(dispatch(fetchAgentProductsData(formValues.agentId)))
            .then(dispatch(setAgentStatus(true)))
        : dispatch(addProductData(formValues)).then(
            dispatch(fetchAgentProductsData(formValues.agentId))
          );
      Navigate("/agent");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    Object.keys(values).forEach((key) => {
      setErrorObj((prevState) => {
        return { ...prevState, [key]: values[key] === "" };
      });
    });
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    // setBaseImage((prevState) => base64);
    setFormValues((prevState) => {
      return { ...prevState, postimg: base64 };
    });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const { propertyId } = useParams();

  useEffect(() => {
    // If Agent is editing the property
    isEditing &&
      axios
        .get(`http://localhost:5000/products/${propertyId}`)
        .then((res) => setFormValues(res.data));
  }, []);

  return (
    <div className="propertyform_background_img">
      <div className="form_card">
        <form>
          <p className="radio_heading">Property Type : </p>
          <div className="form_radio_group">
            <FormInput
              inputLabel="Sale"
              inputType="radio"
              inputName="propertytype"
              inputValue="sale"
              onHandleChange={handleChange}
              // errorMessage={formErrors.lastname}
              customClass={"form_radio"}
              checked={formValues.propertytype === "sale"}
            />

            <FormInput
              inputLabel="Rent"
              inputType="radio"
              inputName="propertytype"
              inputValue="rent"
              onHandleChange={handleChange}
              // errorMessage={formErrors.lastname}
              customClass={"form_radio"}
              checked={formValues.propertytype === "rent"}
            />
          </div>

          <FormInput
            inputLabel="Property Name :"
            inputType="text"
            inputName="propertyname"
            inputValue={formValues.propertyname}
            onHandleChange={handleChange}
            // errorMessage={formErrors.firstname}
            errorMessage={
              errorObj.propertyname ? "Property Name is required" : ""
            }
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <FormInput
            inputLabel="Property Address :"
            inputType="text"
            inputName="propertyaddress"
            inputValue={formValues.propertyaddress}
            onHandleChange={handleChange}
            // errorMessage={formErrors.lastname}
            errorMessage={
              errorObj.propertyaddress ? "Property Address is required" : ""
            }
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <FormInput
            inputLabel="Property Sq.ft :"
            inputType="number"
            inputName="propertysq"
            inputValue={formValues.propertysq}
            onHandleChange={handleChange}
            // errorMessage={formErrors.mobileno}
            errorMessage={
              errorObj.propertysq ? "Property Square Foot is required" : ""
            }
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <FormInput
            inputLabel="Bedrooms :"
            inputType="number"
            inputName="bedrooms"
            inputValue={formValues.bedrooms}
            onHandleChange={handleChange}
            // errorMessage={formErrors.emailid}
            errorMessage={errorObj.bedrooms ? "Bedrooms No. is required" : ""}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <FormInput
            inputLabel="Price :"
            inputType="number"
            inputName="price"
            inputValue={formValues.price}
            onHandleChange={handleChange}
            // errorMessage={formErrors.city}
            errorMessage={errorObj.price ? "Price is required" : ""}
            errorClass={"error_para"}
            customClass={"form_input"}
          />

          <div className="form_input">
            <label htmlFor="postimg">Choose a Image:</label>

            <input
              type="file"
              id="postimg"
              name="postimg"
              accept="image/png, image/jpeg"
              onChange={(event) => {
                uploadImage(event);
              }}
            />

            <br></br>
            {errorObj.postimg && (
              <p className="error_para">Image is required</p>
            )}

            <img src={formValues.postimg} height="200px" alt="" />
          </div>

          <div className="form_input login_btn">
            <button className="form_btn" onClick={postHandler}>
              {isEditing ? "Update Property " : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
