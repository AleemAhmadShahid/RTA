import React from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  FormButton,
} from "./multistepformstyling";
import { styled } from "styled-components";

const H6 = styled.h6`
  margin-top: 10px; /* Add top margin */
  margin-bottom: 20px;
`;

const StepOne = ({ formData, handleChange }) => {
  return (
    <FormStep active>
      <H6>Personal Information</H6>
      <FormGroup>
        <FormLabel>First Name</FormLabel>
        <FormInput
          type="text"
          value={formData.firstName || ""}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Last Name</FormLabel>
        <FormInput
          type="text"
          value={formData.lastName || ""}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Email</FormLabel>
        <FormInput
          type="email"
          value={formData.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </FormGroup>
      {/* <FormButton>Next</FormButton> */}
    </FormStep>
  );
};

export default StepOne;
