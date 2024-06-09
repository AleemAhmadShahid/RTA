import React from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  H6,
} from "../../../styles/MultiStepFormStyling";
import { StyledErrorH6 } from "../../Login";

import { validateAlphanumericWithSpace } from "../../../global/validators";

const StepOne = ({ formData, errors, handleChange }) => {

  console.log(formData);
  return (
    <FormStep active>

      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormInput
          type="text"
          value={formData.name || ""}
          placeholder={" Name"}
          onChange={(e) =>
            handleChange("name", e.target.value, validateAlphanumericWithSpace)
          }
          onBlur={(e) =>
            handleChange("name", e.target.value, validateAlphanumericWithSpace)
          }
          required
        />
      </FormGroup>
      {errors.name && <StyledErrorH6>{errors.name}</StyledErrorH6>}

      <FormGroup>
        <FormLabel>Date</FormLabel>
        <FormInput
          type="date"
          value={formData.date && formData.date.split('T')[0] || ""}
          placeholder={" Date"}
          onBlur={(e) => handleChange("date", e.target.value)}
          onChange={(e) => handleChange("date", e.target.value)}
         
        />
      </FormGroup>
      {errors.date && <StyledErrorH6>{errors.date}</StyledErrorH6>}
    </FormStep>
  );
};

export default StepOne;
