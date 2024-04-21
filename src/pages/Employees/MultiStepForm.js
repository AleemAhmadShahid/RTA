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
} from "../styles/MultiStepFormStyling";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { createPostRequest, createPutRequest } from "../../global/requests";
import toast  from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {  setErrorModal } from '../../redux/modalSlice';



const MultiStepForm = ({
  showForm,
  setShowForm,
  formData,
  setFormData,
  reload,
  setReload,
  isEditMode,
}) => {
  const dispatch = useDispatch();
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
    const setField = (obj, keys, val) => {
      if (keys.length === 1) obj[keys[0]] = val;
      else {
        const [head, ...rest] = keys;
        if (!obj[head]) obj[head] = isNaN(parseInt(rest[0])) ? {} : [];
        obj[head] = setField(obj[head], rest, val);
      }
      return obj;
    };

    const fieldParts = field.split(".");
    data = setField(data, fieldParts, value);
    setFormData(data);
    if (typeof setError === "function" && value === "")
      setErrors(setField({ ...errors }, fieldParts, ""));
    else if (typeof setError == "function")
      setErrors(setField({ ...errors }, fieldParts, setError(value)));
  };
  const closeForm = (message) => {
    setFormData({});
    setShowForm(false);
  };

  
  const isFirstStep = step === 1;
  const isLastStep = step === 4;

  const handleSave = async (nextStep = null) => {
    let required = false;
    const fields = ["name", "email"];
    let errorFields = { ...errors };
    for (const field of fields) {
      if (
        (!required && formData[field] === undefined) ||
        formData[field] === ""
      ) {
        errorFields = { ...errorFields, [field]: "This field is required" };
        required = true;
      }
    }
    if (required) {
      setErrors(errorFields);
      return;
    }
    const copyFormData = { ...formData };
    copyFormData.profileImg = /\/([^/?]+)\?/.test(formData.profileImg)
      ? formData.profileImg.match(/\/([^/?]+)\?/)[1]
      : formData.profileImg;
    if (copyFormData._id === undefined) {
      const response = await createPostRequest(copyFormData, "/api/user");
      if (response.status === 201) {
        handleChange("_id", response.user._id);
        setReload(!reload);
        toast.success("Employee added Succesfully!");
      } else {
        dispatch(setErrorModal({message: response.error}));
        return;
      }
    } else {
      const response = await createPutRequest(
        copyFormData,
        `/api/user/${formData._id}/`
      );
      toast.success("Employee updated Succesfully!");
      setReload(!reload);
    }
    if (typeof nextStep != "function") closeForm("anything");
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
