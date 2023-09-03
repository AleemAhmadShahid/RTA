import React, { useState } from 'react';
import { ModalOverlay, ModalContainer } from './multistepformstyling';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { FormButton } from './multistepformstyling';
import StepNumber from './StepNumber'; 
import styled from 'styled-components';


const CloseButton = styled.button`
  padding: 5px 10px;    /* Adjust the padding to make it smaller */
  font-size: 16px;     /* Adjust the font size */
  background: none;    /* Remove the background color */
  border: none;        /* Remove the border */
  cursor: pointer;     /* Change the cursor to a pointer on hover */
  color: 'black',
`;
const prevButtonStyle = {
    backgroundColor: 'white',
    color: 'black',
    border: '0px solid #ccc',
    fontSize: 'small',
    padding: '10px 20px',
    borderRadius: '10px',
    marginRight: '10px', // Add space between buttons
  };
  
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(true); // Initially set to true to show the form

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const closeForm = () => {
    setShowForm(false);
  };
  const openForm = () => {
    setShowForm(true);
    setStep(1); // Reset the form to the first step when opening it
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne formData={formData} handleChange={handleChange} />;
      case 2:
        return <StepTwo formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    showForm && (
      <ModalOverlay>
        <ModalContainer>
          <CloseButton onClick={closeForm} className="close-button">
            &#10005; {/* Close (cross) symbol */}
          </CloseButton>
           <StepNumber currentStep={step} totalSteps={2} /> 
          <h3>We can't wait to meet you</h3>
          
          {renderStep()}
          {step > 1 && <FormButton onClick={prevStep} style={prevButtonStyle}>&#8592;Previous</FormButton>}
          {step < 3 && <FormButton onClick={nextStep}>Next</FormButton>}
        </ModalContainer>
      </ModalOverlay>
    )
  );
};

export default MultiStepForm;
