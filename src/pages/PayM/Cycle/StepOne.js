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
          <FormLabel>Cycle Type</FormLabel>
          <EntriesDropdown
              width="100%"
            value={(formData?.cycleType
              && {label: formData?.cycleType, value: formData?.cycleType})
              || {label: "Select", value: "Select"}}
            onChange={(selectedOption) =>{
                handleChange(
                  `cycleType`,
                  selectedOption.value
                );
              }
            }
            options={['Monthly', 'Weekly', 'Bi-Monthly'].map((item) => ({label: item, value: item}))}
            styles={dropDownStyle}
          />
                
      </FormGroup>


      {errors.cycleType && <StyledErrorH6>{errors.cycleType}</StyledErrorH6>}
      
     

      
    </FormStep>
  );
};

export default StepOne;
