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
        <FormLabel>Start Time</FormLabel>
        <FormInput
          type="time"
          value={new Date(formData.startTime).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
          placeholder={" Start Time"}
          onChange={(e) => handleChange("startTime", new Date().toISOString().split('T')[0] + "T" + e.target.value + ":00")}
        />
      </FormGroup>
      {errors.startTime && <StyledErrorH6>{errors.startTime}</StyledErrorH6>}

      <FormGroup>
        <FormLabel>End Time</FormLabel>
        <FormInput
          type="time"
          value={new Date(formData.endTime).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
          placeholder={" End Time"}
          onChange={(e) => handleChange("endTime", new Date().toISOString().split('T')[0] + "T" + e.target.value + ":00")}
        />
      </FormGroup>
      {errors.endTime && <StyledErrorH6>{errors.endTime}</StyledErrorH6>}

      
      <FormGroup>
        <FormLabel>Break Duration</FormLabel>
        <FormInput
          type="number"
          value={formData.breakDuration}
          placeholder={" Break Duration (minutes)"}
          min="0"
          onChange={(e) => handleChange("breakDuration", parseInt(e.target.value))}
        />
      </FormGroup>
      
    </FormStep>
  );
};

export default StepOne;
