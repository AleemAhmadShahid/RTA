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
  HeaderContainer,
  Heading,
  FormCenteringContainer,
} from "../../../styles/MultiStepFormStyling";
import StepOne from "./StepOne";
import ViewShift from "./ViewShift";
import { changeHandler, saveHandler } from "../../../global/helper";



const MultiStepForm = ({
  showForm,
  setShowForm,
  formData,
  setFormData,
  reload,
  setReload,
  isEditMode,
  isViewMode,
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
    changeHandler(setFormData,  setErrors, errors, data, field, value,setError);
  };
  const closeForm = (message) => {
    setFormData({});
    setShowForm(false);
  };

  
  const isFirstStep = step === 1;
  const isLastStep = step === 1;

  const handleSave = async (nextStep = null) => {
    saveHandler(nextStep, ["name", "startTime", "endTime"],"/api/shift", `/api/shift/${formData._id}/`, "Shift saved Successfully!", "shift", errors, formData, setErrors, handleChange, setReload, reload, closeForm);
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
      <ModalOverlay >
        <FormCenteringContainer >
          <ModalContainer>
            <HeaderContainer>
              <Heading>
              {
                  isViewMode ? "View Shift" : (isEditMode ? "Update Shift" : "Create Shift")
              }
              </Heading>
              <CloseButtonContainer>
                <CloseButton onClick={closeForm} className="close-button">
                  &#10005;
                </CloseButton>
              </CloseButtonContainer>
            </HeaderContainer>
            <InnermodalContainer>             
            {
              isViewMode ? (
                <ViewShift shift={formData}/>
              ) : (
                <>
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
                </>
              )
            }

            </InnermodalContainer>
          </ModalContainer>
        </FormCenteringContainer>
      </ModalOverlay>
    )
  );
};

export default MultiStepForm;
