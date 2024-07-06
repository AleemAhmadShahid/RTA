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
          <FormLabel>Expense Type</FormLabel>
          <EntriesDropdown
              width="100%"
            value={(formData?.expenseType
              && {label: formData?.expenseType, value: formData?.expenseType})
              || {label: "Select", value: "Select"}}
            onChange={(selectedOption) =>{
                handleChange(
                  `expenseType`,
                  selectedOption.value
                );
              }
            }
            options={['Travel', "Food", 'Others'].map((item) => ({label: item, value: item}))}
            styles={dropDownStyle}
          />
                
      </FormGroup>
      
      {/* {errors.Title && <StyledErrorH6>{errors.Title}</StyledErrorH6>} */}
      
      <FormGroup>
        <FormLabel>Amount</FormLabel>
        <FormInput
          type="text"
          value={formData.amount || ""}
          placeholder={"Amount"}
          onChange={(e) => handleChange("amount", e.target.value)}
          onBlur={(e) => handleChange("amount", e.target.value)}
          // required
        />
      </FormGroup>
      <FormGroup>
          <FormLabel>Date Incurred</FormLabel>
          <FormInput
          type="date"
          value={(formData.dateIncurred && formData.dateIncurred.split('T')[0]) || ""}
          onChange={(e) => handleChange("dateIncurred", e.target.value)}
        />
                
      </FormGroup>

      {/* {errors.policyType && <StyledErrorH6>{errors.policyType}</StyledErrorH6>} */}
      
     

      
    </FormStep>
  );
};

export default StepOne;
