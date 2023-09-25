import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FormStep,
  FormGroup,
  FormInput,
  PictureUploadButton,
  FormLabel,
  Step3Container,
  BoxStep3Container,
  Step3BorderBox,
  Step3CloseButton,
  Step3AddButton,
  H6,
} from "../styles/MultiStepFormStyling";
import {
  EntriesDropdown,
  dropDownStyle
  } from "../styles/TableStyling";

const StepThree = ({ formData, handleChange }) => {
  const [qualification, setQualifications] = useState([]);
  const [experience, setExperience] = useState([]);
  // useEffect(() => {
  //   setQualifications(formData.qualification);
  //   setExperience(formData.experience);
  // },[]);
  useEffect(() => {
    // Check if formData.qualification and formData.experience are defined
    if (formData && (formData.qualification && formData.experience)) {
      setQualifications(formData.qualification);
      setExperience(formData.experience);
    }
  }, []);

  const addItem = (setFunction, state) => {
    setFunction([...state, state.length]);
  };

  // const removeItem = (index, setFunction,state, key) => {
  //   const newState = [...state];
  //   newState.splice(index, 1);
  //   setFunction(newState);
  //   const newData = [...formData[key]];
  //   newData.splice(index, 1);
  //   handleChange(key, newData);
  // };
  const removeItem = (index, setFunction, state, key) => {
    const newState = [...state];
    newState.splice(index, 1);
    setFunction(newState);

    // Check if formData[key] is an array before attempting to splice
    if (Array.isArray(formData[key])) {
      const newData = [...formData[key]];
      newData.splice(index, 1);
      handleChange(key, newData);
    }
  };

  return (
    <FormStep active>
      <H6>Fill in the details so that we can get in contact with you</H6>
      <FormLabel>Qualification</FormLabel>
      <Step3Container>
        <BoxStep3Container>
          {qualification.map((item, index) => (
            <Step3BorderBox key={index}>
              <Step3CloseButton
                onClick={() =>
                  removeItem(
                    index,
                    setQualifications,
                    qualification,
                    "qualification"
                  )
                }
              >
                ×
              </Step3CloseButton>

              <FormGroup>
                <FormLabel>Level</FormLabel>
                {/* <FormInput
                  type="text"
                  value={formData?.qualification?.[index]?.level || ""}
                  onChange={(e) =>
                    handleChange(`qualification.${index}.level`, e.target.value)
                  } />*/}
                  <EntriesDropdown
                    width="100%"
                  value={formData?.qualification?.[index]?.level 
                    && {label: formData?.qualification?.[index]?.level, value: formData?.qualification?.[index]?.level}
                    || {label: "Bachelors", value: "Bachelors"}}
                  onChange={(selectedOption) =>{
                      handleChange(
                        `qualification.${index}.level`,
                        selectedOption.value
                      );
                    }
                  }
                  options={[
                    {label: "Bachelors", value: "Bachelors"},
                    {label: "Masters", value: "Masters"},
                    {label: "PhD", value: "PhD"},
                  ]}
                  styles={dropDownStyle}
                />
                
                </FormGroup>

                <FormGroup>
                <FormLabel>Degree</FormLabel>
                <FormInput
                  type="text"
                  value={formData?.qualification?.[index]?.degree || ""}
                  onChange={(e) =>
                    handleChange(
                      `qualification.${index}.degree`,
                      e.target.value
                    )
                  }
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Instituion</FormLabel>
                <FormInput
                  type="text"
                  value={formData?.qualification?.[index]?.institution || ""}
                  onChange={(e) =>
                    handleChange(
                      `qualification.${index}.institution`,
                      e.target.value
                    )
                  }
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Year</FormLabel>
                <FormInput
                  type="Number"
                  value={formData?.qualification?.[index]?.year || ""}
                  onChange={(e) =>
                    handleChange(`qualification.${index}.year`, e.target.value)
                  }
                />
              </FormGroup>

              <FormGroup>
                <PictureUploadButton>
                  Upload Document
                  <input type="file" onChange={(e) => {}} />
                </PictureUploadButton>
              </FormGroup>

            </Step3BorderBox>
          ))}
        </BoxStep3Container>
        <Step3AddButton
          onClick={() => addItem(setQualifications, qualification)}
        >
          Add Qualification
        </Step3AddButton>
      </Step3Container>
      <FormLabel>Experience</FormLabel>
      <Step3Container>
        <BoxStep3Container>
          {experience.map((item, index) => (
            <Step3BorderBox key={index}>
              <Step3CloseButton
                onClick={() =>
                  removeItem(index, setExperience, experience, "experience")
                }
              >
                ×
              </Step3CloseButton>
              
              <FormGroup>
                <FormLabel>Company</FormLabel>
                <FormInput
                  type="text"
                  value={formData?.experience?.[index]?.company || ""}
                  onChange={(e) =>
                    handleChange(`experience.${index}.company`, e.target.value)
                  }
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Job Title</FormLabel>
                <FormInput
                  type="text"
                  value={formData?.experience?.[index]?.jobTitle || ""}
                  onChange={(e) =>
                    handleChange(`experience.${index}.jobTitle`, e.target.value)
                  }
                />
               </FormGroup>
              
              <FormGroup>
                <FormLabel>Start Date</FormLabel>
                <FormInput
                  type="Date"
                  value={formData?.experience?.[index]?.startDate || ""}
                  onChange={(e) =>
                    handleChange(
                      `experience.${index}.startDate`,
                      e.target.value
                    )
                  }
                />
               </FormGroup>
              
              <FormGroup>
                <FormLabel>End Date</FormLabel>
                <FormInput
                  type="Date"
                  value={formData?.experience?.[index]?.endDate || ""}
                  onChange={(e) =>
                    handleChange(`experience.${index}.endDate`, e.target.value)
                  }
                />
              </FormGroup>

              <FormGroup>
                <PictureUploadButton>
                  Upload Document
                  <input type="file" onChange={(e) => {}} />
                </PictureUploadButton>
              </FormGroup>
              
            </Step3BorderBox>
          ))}
        </BoxStep3Container>
        <Step3AddButton onClick={() => addItem(setExperience, experience)}>
          Add Experience
        </Step3AddButton>
      </Step3Container>
    </FormStep>
  );
};

export default StepThree;
