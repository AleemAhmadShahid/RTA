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
  return (
    <FormStep active>
      <H6 style={{ width: "300px" }}>Basic Information</H6>

      <FormGroup>
        <FormLabel>Title</FormLabel>
        <FormInput
          type="text"
          value={formData.title || ""}
          placeholder={" Title"}
          onChange={(e) =>
            handleChange("title", e.target.value, validateAlphanumericWithSpace)
          }
          onBlur={(e) =>
            handleChange("title", e.target.value, validateAlphanumericWithSpace)
          }
          required
        />
      </FormGroup>
      {errors.title && <StyledErrorH6>{errors.title}</StyledErrorH6>}
      
        <FormGroup>
          <FormLabel>Content</FormLabel>
          <textarea
            style={{ borderRadius: "5px" }}
            value={formData.content || ""}
            placeholder={" Content"}
            onChange={(e) => handleChange("content", e.target.value)}
            rows={4} 
            cols={35} 
          ></textarea>
        </FormGroup>
      
    </FormStep>
  );
};

export default StepOne;
