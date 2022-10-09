import React from "react";
import Cross from "../Assets/cross.svg";
import "../Scss/updatedetails.scss";
import Form from 'react-bootstrap/Form'

const Updatedetails = () => {
  return (
    <>
      <div className="update-details">
        <div className="update-container">
          <div className="update-header">
            <text>Personal Details</text>
            <img src={Cross} alt=""></img>
          </div>
          <div className="form-fill">
            <form>
              <label>
                Enter your full name*
                <br />
                <input type="text" />
              </label>
              <label>
                Enter Email*
                <br />
                <input type="text" />
              </label>
              <label>
                Enter Phone Number*
                <br />
                <input type="number" />
              </label>
              <label>
                Enter Address*
                <br />
                <input type="text" />
              </label>
            </form>
          </div>
          <checkbox />
          <div className="footer-text"> 
          <Form.Check aria-label="option 1" /><p >
            You agree to the <a href=""> Terms and Conditions </a>
          </p>
          </div>
         
          
            <button>Update</button>
         
        </div>
      </div>
    </>
  );
};

export default Updatedetails;
