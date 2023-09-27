import React, { useState } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  InnermodalContainer,
  FormButton,
  BottomButtonsContainer,
  CloseButton,
  CloseButtonContainer,
  SaveButton,
  SaveAndNextButton,
  FormButtonContainer,
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
import styled from "styled-components";
import { createPostRequest, createPutRequest } from "../../global/helper";

const MultiStepForm = ({
  showForm,
  setShowForm,
  formData,
  setFormData,
  setMessage,
  setIsDialogOpen,
  setshowToast,
  reload,
  setReload
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
    if (typeof setError == "function" && value == "")
      setErrors(setField({...errors}, fieldParts, ""));
    else if (typeof setError == "function")
      setErrors(setField({...errors}, fieldParts, setError(value)));
  };
  const closeForm = (message) => {
    setFormData({});
    setShowForm(false);
    if (typeof message != "object")
      setshowToast(true);
    setTimeout(() => setshowToast(false), 2000);
  };

  const openForm = () => {
    setShowForm(true);
    setStep(1);
  };
  const isFirstStep = step === 1;
  const isLastStep = step === 4;

  const handleSave = async (nextStep = null) => {
    let required = false;
    const fields = ["name", "email"];
    let errorFields = {...errors};
    for(const field of fields)
    {
      if((!required && formData[field] === undefined || formData[field] === ''))
      {
        errorFields = { ...errorFields, [field]: 'This field is required' };
        required = true;
      }
    };
    if (required)
    {
      setErrors(errorFields);
      return;
    };
    const copyFormData = {...formData};
    copyFormData.profileImg =  /\/([^/?]+)\?/.test(formData.profileImg) ? formData.profileImg.match(/\/([^/?]+)\?/)[1] : formData.profileImg;
    if(copyFormData._id == undefined)
    {
      const response = await createPostRequest(copyFormData,'/api/user');
      if (response.status == 201)
      {
         handleChange("_id", response.user._id);
         setReload(!reload);
         setMessage("Operation Successful");
      }
      else
      {
        setMessage(response.error);
        setIsDialogOpen(true);
        return;    
      }
    }
    else
    {
      const response = await createPutRequest(copyFormData,`/api/user/${formData._id}/`);
      setMessage("Operation Successful");
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
      case 3: // Include the third step here
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
          {/*<HeaderContainer>
           <Heading>Create a company</Heading> 
            <CloseButtonContainer>
          <CloseButton onClick={closeForm} className="close-button">
            &#10005;
          </CloseButton></CloseButtonContainer> </HeaderContainer> */}
          <ModalContainer>
            <HeaderContainer>
              <Heading>Create User</Heading>
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
                    {stepNumber === 1 && <Line />} {/* Add this line */}
                    {stepNumber === 2 && <Line />}
                    {stepNumber === 3 && <Line />}
                  </StepIndicatorContainer>
                ))}
              </StepIndicators>
              {/* <h3>We can't wait to meet you</h3> */}
              {renderStep()}
              <BottomButtonsContainer>
                {/* <FormButtonContainer>  */}
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
                {/* </FormButtonContainer> */}
              </BottomButtonsContainer>
            </InnermodalContainer>
          </ModalContainer>
        </FormCenteringContainer>
      </ModalOverlay>
    )
  );
};

export default MultiStepForm;
