import React from "react";
import styled from "styled-components";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  
} from "../styles/MultiStepFormStyling";

const StepTwo = ({ formData, handleChange }) => {
  return (
    <FormStep active>
      <div style={{ flex: 1 }}>
        <FormGroup>
          <h6>Fill in the details so that we can get in touch with you</h6>
          <FormLabel>Date of Joining</FormLabel>
          <FormInput
            type="date"
            value={formData.dateOfJoining || ""}
            onChange={(e) => handleChange("dateOfJoining", e.target.value)}
          />
        </FormGroup>
      </div>

      <FormGroup>
        <FormLabel>Role</FormLabel>
        <FormInput
          type="text"
          value={formData.phoneNumber || ""}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />
      </FormGroup>
    </FormStep>
  );
};

export default StepTwo;
