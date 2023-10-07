import React from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
} from "../styles/MultiStepFormStyling";
import { StyledErrorH6 } from "../Login";

import { validateAlphanumericWithSpace } from "../../global/validators";

const StepOne = ({ formData, errors, handleChange }) => {
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
          <FormLabel>Description</FormLabel>
          <textarea
            style={
              { 
              borderRadius: "5px", 
              padding: "10px",   
              border: "1px solid #ccc",
              width: "100%"
              }
            }
            value={formData.description || ""}
            placeholder={" Role Description"}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4} 
            cols={35} 
          ></textarea>
        </FormGroup>
      
    </FormStep>
  );
};

export default StepOne;
