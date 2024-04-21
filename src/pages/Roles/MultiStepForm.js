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
} from "../styles/MultiStepFormStyling";
import StepOne from "./StepOne";
import ViewRole from "./ViewRole";
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
  isViewMode,
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
  const isLastStep = step === 1;

  const handleSave = async (nextStep = null) => {
    let required = false;
    const fields = ["name"];
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
      const response = await createPostRequest(copyFormData, "/api/role");
      if (response.status === 201) {
        handleChange("_id", response.role._id);
        setReload(!reload);
        toast.success("Role added Successfully!");
      } else {
        dispatch(setErrorModal({message: response.error || response.message}));
        return;
      }
    } else {
      const response = await createPutRequest(
        copyFormData,
        `/api/role/${formData._id}/`
      );
      toast.success("Role updated Successfully!");
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
                  isViewMode ? "View Role" : (isEditMode ? "Update Role" : "Create Role")
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
                <ViewRole role={formData}/>
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
