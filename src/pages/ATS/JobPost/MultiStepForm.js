import React, { useState } from "react";
import {
  ModalOverlay,
  ModalContainer,
  InnermodalContainer,
  BottomButtonsContainer,
  CloseButton,
  CloseButtonContainer,
  SaveButton,
  SaveAndNextButton,
  PreviousButton,
  StepIndicators,
  StepIndicatorContainer,
  StepIndicator,
  Line,
  HeaderContainer,
  Heading,
  FormCenteringContainer,
} from "../../../styles/MultiStepFormStyling";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { changeHandler, saveHandler } from "../../../global/helper";



const MultiStepForm = ({
  showForm,
  setShowForm,
  formData,
  setFormData,
  reload,
  setReload,
  isEditMode,
}) => {
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({});

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (
    field,
    value,
    setError = false,
    data = { ...formData }
  ) => {
    changeHandler(setFormData, setErrors, errors, data, field, value,setError);
  };
  const closeForm = (message) => {
    setFormData({});
    setShowForm(false);
  };

  
  const isFirstStep = step === 1;
  const isLastStep = step === 4;

  const handleSave = async (nextStep = null) => {
    const copyFormData = { ...formData };
    copyFormData.profileImg = /\/([^/?]+)\?/.test(formData.profileImg)
      ? formData.profileImg.match(/\/([^/?]+)\?/)[1]
      : formData.profileImg;

    saveHandler(nextStep, ["postingTitle"] ,"/api/jobPost", `/api/jobPost/${formData._id}/`, "Jost Post updated Successfully!", "jobPost", errors, copyFormData, setErrors, handleChange, setReload, reload, closeForm);

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
      case 3:
        return <StepThree formData={formData} handleChange={handleChange} />;
      case 4:
        return <StepFour formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    showForm && (
      <ModalOverlay>
        <FormCenteringContainer>
          <ModalContainer>
            <HeaderContainer>
              <Heading>{isEditMode ? "Update User" : "Create User"}</Heading>
              <CloseButtonContainer>
                <CloseButton onClick={closeForm} className="close-button">
                  &#10005;
                </CloseButton>
              </CloseButtonContainer>
            </HeaderContainer>
            <InnermodalContainer>
              <StepIndicators>
                {[1, 2, 3, 4].map((stepNumber) => (
                  <StepIndicatorContainer key={stepNumber}>
                    <StepIndicator active={stepNumber <= step}>
                      {stepNumber}
                    </StepIndicator>
                    {stepNumber === 1 && <Line />} 
                    {stepNumber === 2 && <Line />}
                    {stepNumber === 3 && <Line />}
                  </StepIndicatorContainer>
                ))}
              </StepIndicators>
             
              {renderStep()}
              <BottomButtonsContainer>
                
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
