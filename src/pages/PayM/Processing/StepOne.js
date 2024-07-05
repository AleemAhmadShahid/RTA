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
        <FormLabel>Pay Period Start</FormLabel>
        <FormInput
          type="date"
          value={(formData.payPeriodStart && formData.payPeriodStart.split('T')[0]) || ""}
          onChange={(e) => handleChange("payPeriodStart", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
      <FormLabel>Pay Period End</FormLabel>
        <FormInput
          type="date"
          value={(formData.payPeriodEnd && formData.payPeriodEnd.split('T')[0]) || ""}
          onChange={(e) => handleChange("payPeriodEnd", e.target.value)}
        />
      </FormGroup>
                
      


      {/* {errors.payPeriodStart && <StyledErrorH6>{errors.payPeriodStart}</StyledErrorH6>} */}
      
     

      
    </FormStep>
  );
};

export default StepOne;
