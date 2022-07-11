import React from "react";
import "./FormInput.css";

const FormInput = (props) => {
  let {
    inputLabel,
    inputType,
    inputName,
    inputValue,
    onHandleChange,
    errorMessage,
    customClass,
  } = props;

  return (
    <>
      <div className={customClass}>
        <label htmlFor={inputName}>{inputLabel}</label>
        <input
          type={inputType}
          name={inputName}
          id={inputName}
          value={inputValue}
          onChange={onHandleChange}
        />
      </div>
      {errorMessage !== "" && <p>{errorMessage}</p>}
    </>
  );
};

export default FormInput;
