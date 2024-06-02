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
  const isLastStep = step === 1;

  const handleSave = async (nextStep = null) => {
    const copyFormData = { ...formData };
    copyFormData.profileImg = /\/([^/?]+)\?/.test(formData.profileImg)
      ? formData.profileImg.match(/\/([^/?]+)\?/)[1]
      : formData.profileImg;

    saveHandler(nextStep, ["candidate"] ,"/api/interview", `/api/interview/${formData._id}/`, "Interview updated Successfully!", "interview", errors, copyFormData, setErrors, handleChange, setReload, reload, closeForm);

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
              <Heading>{isEditMode ? "Update Interview" : "Schedule Interview"}</Heading>
              <CloseButtonContainer>
                <CloseButton onClick={closeForm} className="close-button">
                  &#10005;
                </CloseButton>
              </CloseButtonContainer>
            </HeaderContainer>
            <InnermodalContainer>
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
