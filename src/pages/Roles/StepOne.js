import React from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  H6,
} from "../styles/MultiStepFormStyling";
import { StyledErrorH6 } from "../Login";

import {validateAlphanumericWithSpace} from "../../global/validators";

const StepOne = ({ formData, errors, handleChange }) => {
  return (
    <FormStep active>
      <H6>Basic Information</H6>

      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormInput
          type="text"
          value={formData.name || ""}
          placeholder={" Name"}
          onChange={(e) => handleChange("name", e.target.value, validateAlphanumericWithSpace)}
          onBlur={(e) => handleChange("name", e.target.value, validateAlphanumericWithSpace)}
          required
        />
      </FormGroup>
      {errors.name && <StyledErrorH6>{errors.name}</StyledErrorH6>}
      <FormGroup>
        <FormLabel>Description</FormLabel>
        <FormInput
          type="text"
          value={formData.description || ""}
          placeholder={" Role Description"}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </FormGroup>
    </FormStep>
  );
};

export default StepOne;
