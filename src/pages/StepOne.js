import React from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  FormHalfInput,
  FormButton,
} from "./multistepformstyling";
import { StyledErrorH6 } from "./Login"
import { styled } from "styled-components";

const H6 = styled.h6`
  margin-top: 10px; /* Add top margin */
  margin-bottom: 20px;
`;

const StepOne = ({ formData, errors, handleChange }) => {
  return (
    <FormStep active>
      <H6>Personal Information</H6>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormInput
          type="text"
          value={formData.name || ""}
          placeholder={" Name"}
          onChange={(e) => handleChange("name", e.target.value, true)}
          onBlur={(e) => handleChange("name", e.target.value, true)}
          required
        />
      </FormGroup>
      {errors.name && <StyledErrorH6>{errors.name}</StyledErrorH6>}
      <FormGroup>
        <FormLabel>Email</FormLabel>
        <FormInput
          type="email"
          value={formData.email || ""}
          placeholder={" user@example.com"}
          onBlur={(e) => handleChange("email", e.target.value, true)}
          onChange={(e) => handleChange("email", e.target.value, true)}
        />
      </FormGroup>
      {errors.email && <StyledErrorH6>{errors.email}</StyledErrorH6>}
      <FormGroup>
        <FormLabel>Phone Number</FormLabel>
        <FormInput
          type="text"
          value={formData.phoneNumber || ""}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          placeholder={" +92"}
        />
      </FormGroup>
      <FormGroup>
            <FormLabel>Date of Birth</FormLabel>
            <FormInput
              type="date"
              value={formData.dob || ''}
              onChange={(e) => handleChange('dob', e.target.value)}
            />
          </FormGroup>
      <FormGroup>
        <FormLabel>Address</FormLabel>
        <FormInput
          type="text"
          value={formData.address && formData.address.street || ""}
          onChange={(e) => handleChange("address.street", e.target.value)}
          placeholder={" Street"}
        />
      </FormGroup>
      <FormGroup>
          <div style={{ display: 'flex' }}>
          <FormHalfInput type="text" value={formData.address && formData.address.city || ""}
          onChange={(e) => handleChange("address.city", e.target.value)} placeholder=" City" style={{ marginRight: '10px' }} />
          <FormHalfInput type="text" value={formData.address && formData.address.zipCode || ""}
          onChange={(e) => handleChange("address.zipCode", e.target.value)} placeholder=" Zip Code" />
        </div>
      </FormGroup>
      
      
      {/* <FormButton>Next</FormButton> */}
    </FormStep>
  );
};

export default StepOne;
