import React, { useState } from 'react';
import { ModalOverlay, ModalContainer } from './multistepformstyling';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { FormButton } from './multistepformstyling';
import styled from 'styled-components';

const CloseButton = styled.button`
  padding: 7px 7px;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  margin-buttom:1px;
  margin-right:0px; /* This will push the button to the right */
`;
const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const SaveButton = styled(FormButton)`
  background-color: white;
  color: black;
`;

const SaveAndNextButton = styled(FormButton)`
  background-color: #ffa500;
  color: white;
`;

const FormButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const prevButtonStyle = {
  backgroundColor: 'white',
  color: 'black',
  border: '0px solid #ccc',
  fontSize: 'small',
  padding: '10px 20px',
  borderRadius: '10px',
  marginRight: '10px',
};
const PreviousButton = styled(FormButton)`
  background-color: white;
  color: black;
`;



const StepIndicators = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StepIndicator = styled.div`
  width: 39px;
  height: 39px;
  border: 3px solid ${(props) => (props.active ? '#ffa500' : '#ccc')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
  margin-bottom: 10px;
  color: #000; /* Set the number color to black */
`;



const Line = styled.div`
  width: 90px;
  height: 2px;
  background: #ccc;
  margin-right: 10px;
  margin-top:-10px;
`;

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(true);

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
    setStep(1);
  };
  const isFirstStep = step === 1;
  const isLastStep = step === 3;

  const handleSave = () => {
    // Save the data
    // Add your data-saving logic here

    if (isLastStep) {
      // Close the form after saving on the last step
      closeForm();
    } else {
      // Move to the next step after saving
    //   nextStep();
    }
  
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne formData={formData} handleChange={handleChange} />;
      case 2:
        return <StepTwo formData={formData} handleChange={handleChange} />;
      case 3: // Include the third step here
        return <StepThree formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };
  

  return (
    showForm && (
      <ModalOverlay>
        <ModalContainer>
            <CloseButtonContainer>
          <CloseButton onClick={closeForm} className="close-button">
            &#10005;
          </CloseButton></CloseButtonContainer>
          <StepIndicators>
            {[1, 2,3].map((stepNumber) => (
              <StepIndicatorContainer key={stepNumber}>
                <StepIndicator active={stepNumber <= step}>
                  {stepNumber}
                </StepIndicator>
                {stepNumber === 1 && <Line />} {/* Add this line */}
                {stepNumber === 2 && <Line />}
              </StepIndicatorContainer>
            ))}
          </StepIndicators>
          {/* <h3>We can't wait to meet you</h3> */}
          {renderStep()}
          <FormButtonContainer>
            <div>
              {!isFirstStep && (
                <PreviousButton onClick={prevStep}>Previous</PreviousButton>
              )}
            </div>
            <div>
              {isLastStep ? (
                <SaveButton onClick={handleSave}>Save</SaveButton>
              ) : (
                <>
                  <SaveButton onClick={handleSave}>Save</SaveButton>
                  <SaveAndNextButton onClick={nextStep}>Save and Next</SaveAndNextButton>
                </>
              )}
            </div>
          </FormButtonContainer>
        </ModalContainer>
      </ModalOverlay>
    )
  );
};

export default MultiStepForm;
