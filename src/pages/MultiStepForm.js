import React, { useState } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  InnermodalContainer,
} from "./multistepformstyling";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { FormButton } from "./multistepformstyling";
import styled from "styled-components";
import { createPostRequest } from "../global/helper";




const CloseButton = styled.button`
  padding: 7px 7px;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  margin-buttom: 1px;
  margin-right: 0px;
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
  border: 3px solid ${(props) => (props.active ? "#ffa500" : "#ccc")};
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
  margin-top: -10px;
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid #f5f5f5;
  background: #f5f5f5;
  border-top-left-radius: 5px; /* Adjust the value as needed */
  border-top-right-radius: 5px;
  padding: 5px 10px;
`;
const Heading = styled.h5`
  margin: 0;
`;

const FormCenteringContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const BottomButtonsContainer = styled.div`
  position: fixed;
  bottom: 0;
  
   right: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px; /* Add padding to create space around the buttons */
  background-color: white;
 
`;


const MultiStepForm = ({ showForm, setShowForm }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (
    field,
    value,
    setError = false,
    data = { ...formData }
  ) => {
    const setField = (obj, [head, ...rest], val) =>
      rest.length
        ? { ...obj, [head]: setField(obj[head] || {}, rest, val) }
        : { ...obj, [head]: val };

    setFormData(setField(data, field.split("."), value));

    if (setError) {
      if (value.trim() === "")
        setErrors({ ...errors, [field]: "This field is required" });
      else setErrors({ ...errors, [field]: "" });
    }
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

  const handleSave = async (nextStep = null) => {
    let required = false;
    const fields = ['name', 'email'];
    // fields.forEach((field) => {
    //   if((formData[field] === undefined || formData[field] === ''))
    //   {  
    //     setErrors({ ...errors, [field]: 'This field is required' });
    //     required = true;
    //   }
    // });
    if (required)
      return;
    if(formData._id == undefined)
    {
      //const response = await createPostRequest(formData,'/api/user'); 
    }
    if (typeof nextStep != "function") closeForm();
    else nextStep();
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
        );
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
        <FormCenteringContainer>
        {/*<HeaderContainer>
           <Heading>Create a company</Heading> 
            <CloseButtonContainer>
          <CloseButton onClick={closeForm} className="close-button">
            &#10005;
          </CloseButton></CloseButtonContainer> </HeaderContainer> */}
        <ModalContainer>
          <HeaderContainer>
            <Heading>Create a company</Heading>
            <CloseButtonContainer>
              <CloseButton onClick={closeForm} className="close-button">
                &#10005;
              </CloseButton>
            </CloseButtonContainer>
          </HeaderContainer>
          <InnermodalContainer>
            <StepIndicators>
              {[1, 2, 3].map((stepNumber) => (
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
            <BottomButtonsContainer>
            {/* <FormButtonContainer> */}
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
                    <SaveAndNextButton onClick={() => handleSave(nextStep)}>
                      Save and Next
                    </SaveAndNextButton>
                  </>
                )}
              </div>
              </BottomButtonsContainer>
          </InnermodalContainer>
        </ModalContainer>
        </FormCenteringContainer>
      </ModalOverlay>
    )
  );
};

export default MultiStepForm;
