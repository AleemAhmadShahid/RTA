import React from 'react';
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  FormButton,
  FormRadioGroup,
  FormRadioLabel,
  FormRadioInput,
} from './multistepformstyling';

const StepTwo = ({ formData, handleChange }) => {
  return (
    <FormStep active>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <FormGroup>
            <FormLabel>Date of Birth</FormLabel>
            <FormInput
              type="date"
              value={formData.dob || ''}
              onChange={(e) => handleChange('dob', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Address 1</FormLabel>
            <FormInput
              type="text"
              value={formData.address1 || ''}
              onChange={(e) => handleChange('address1', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Address 2</FormLabel>
            <FormInput
              type="text"
              value={formData.address2 || ''}
              onChange={(e) => handleChange('address2', e.target.value)}
            />
          </FormGroup>
          {/* Other input fields */}
        </div>
        <div style={{ flex: 1, marginLeft: '20px' }}> {/* Add marginLeft for space */}
          <FormGroup>
            <FormLabel>Phone Number</FormLabel>
            <FormInput
              type="tel"
              value={formData.phoneNumber || ''}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
            />
          </FormGroup>
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
        </div>
      </div>
      {/* <FormButton>Next</FormButton> */}
    </FormStep>
  );
};

export default StepTwo;
