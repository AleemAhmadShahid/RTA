import React from 'react';
import styled from "styled-components";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  FormButton,
  FormRadioGroup,
  FormRadioLabel,
  FormRadioInput,
} from './MultiStepFormStyling';

const H6 = styled.h6`
  margin-top: 10px; /* Add top margin */
  margin-bottom: 20px;
`;
const StepTwo = ({ formData, handleChange }) => {
  return (
    <FormStep active>
        <H6>Fill in the details so that we can get in contact with you</H6>
      {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
        <div style={{ flex: 1 }}>
          <FormGroup>
            <FormLabel>Date of Birth</FormLabel>
            <FormInput
              type="date"
              value={formData.dob || ''}
              onChange={(e) => handleChange('dob', e.target.value)}
            />
          </FormGroup>
          
          {/* Other input fields */}
        </div>
        {/* <div style={{ flex: 1, marginLeft: '20px' }}> Add marginLeft for space */}
          <FormGroup>
            <FormLabel>Phone Number</FormLabel>
            <FormInput
              type="tel"
              value={formData.phoneNumber || ''}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
            />
          </FormGroup>
         
          <FormRadioGroup>
            <FormRadioLabel>Gender</FormRadioLabel>
            <FormRadioLabel>
              <FormRadioInput
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={(e) => handleChange('gender', e.target.value)}
              />
              Male
            </FormRadioLabel>
            <FormRadioLabel>
              <FormRadioInput
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={(e) => handleChange('gender', e.target.value)}
              />
              Female
            </FormRadioLabel>
          </FormRadioGroup>
        {/* </div> */}
      {/* </div> */}
      {/* <FormButton>Next</FormButton> */}
    </FormStep>
  );
};

export default StepTwo;
