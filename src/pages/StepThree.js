import React from 'react';
import styled from "styled-components";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  FormButton,
} from './multistepformstyling';
import { isStyledComponent } from 'styled-components';

const H6 = styled.h6`
  margin-top: 10px; /* Add top margin */
  margin-bottom: 20px;
`;
const StepThree = ({ formData, handleChange }) => {
  return (
    <FormStep active>
      <FormGroup>
      <H6>Fill in the details so that we can get in contact with you</H6>
        <FormLabel>Address 1</FormLabel>
        <FormInput
          type="text"
          value={formData.address1 || ''}
          onChange={(e) => handleChange('Address', e.target.value)}
        />
      </FormGroup>
      {/* <FormGroup>
        <FormLabel>Address 2</FormLabel>
        <FormInput
          type="text"
          value={formData.address2 || ''}
          onChange={(e) => handleChange('address2', e.target.value)}
        />
      </FormGroup> */}
      <FormGroup>
        <FormLabel>City</FormLabel>
        <FormInput
          type="text"
          value={formData.city || ''}
          onChange={(e) => handleChange('city', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>State</FormLabel>
        <FormInput
          type="text"
          value={formData.state || ''}
          onChange={(e) => handleChange('state', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Country</FormLabel>
        <FormInput
          type="text"
          value={formData.country || ''}
          onChange={(e) => handleChange('country', e.target.value)}
        />
      </FormGroup>
    </FormStep>
  );
};

export default StepThree;
