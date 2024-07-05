import React from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  H6,
} from "../../../styles/MultiStepFormStyling";
import { StyledErrorH6 } from "../../Login";

import {
  EntriesDropdown,
  dropDownStyle
  } from "../../../styles/TableStyling";


const StepOne = ({ formData, errors, handleChange }) => {
  return (
    <FormStep active>
      <H6 style={{ width: "300px" }}>Basic Information</H6>

      <FormGroup>
        <FormLabel>Policy Title</FormLabel>
        <FormInput
          type="text"
          value={formData.policytitle || ""}
          placeholder={"Title"}
          onChange={(e) => handleChange("policytitle", e.target.value)}
          onBlur={(e) => handleChange("policytitle", e.target.value)}
          required
        />
      </FormGroup>
      {/* {errors.Title && <StyledErrorH6>{errors.Title}</StyledErrorH6>} */}
      
      <FormGroup>
        <FormLabel>Policy Fromula</FormLabel>
        <FormInput
          type="text"
          value={formData.policyformula || ""}
          placeholder={"Title"}
          onChange={(e) => handleChange("policyformula", e.target.value)}
          onBlur={(e) => handleChange("policyformula", e.target.value)}
          // required
        />
      </FormGroup>


      {errors.policyType && <StyledErrorH6>{errors.policyType}</StyledErrorH6>}
      
     

      
    </FormStep>
  );
};

export default StepOne;
