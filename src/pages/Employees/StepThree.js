import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FormStep,
  
  FormInput,
  
  FormLabel,
  Step3Container,
  BoxStep3Container,
  Step3BorderBox,
  Step3CloseButton,
  Step3AddButton,
  H6,
} from "../styles/MultiStepFormStyling";

const StepThree = ({ formData, handleChange }) => {
  const [qualification, setQualifications] = useState([]);
  const [experience, setExperience] = useState([]);
  // useEffect(() => {
  //   setQualifications(formData.qualification);
  //   setExperience(formData.experience);
  // },[]);
  useEffect(() => {
    // Check if formData.qualification and formData.experience are defined
    if (formData && formData.qualification && formData.experience) {
      setQualifications(formData.qualification);
      setExperience(formData.experience);
    }
  }, [formData]);

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
      <Step3Container>
        <FormLabel>Qualification</FormLabel>
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
              <div>
                <FormLabel>Level</FormLabel>
                <FormInput
                  type="text"
                  value={formData?.qualification?.[index]?.level || ""}
                  onChange={(e) =>
                    handleChange(`qualification.${index}.level`, e.target.value)
                  }
                />
              </div>
              <div>
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
              </div>
              <div>
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
              </div>

              <div>
                <FormLabel>Year</FormLabel>
                <FormInput
                  type="Number"
                  value={formData?.qualification?.[index]?.year || ""}
                  onChange={(e) =>
                    handleChange(`qualification.${index}.year`, e.target.value)
                  }
                />
              </div>
            </Step3BorderBox>
          ))}
        </BoxStep3Container>
        <Step3AddButton
          onClick={() => addItem(setQualifications, qualification)}
        >
          Add Qualification
        </Step3AddButton>
      </Step3Container>
      <Step3Container>
        <FormLabel>Experience</FormLabel>
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
              <div>
                <FormLabel>Company</FormLabel>
                <FormInput
                  type="text"
                  value={formData?.experience?.[index]?.company || ""}
                  onChange={(e) =>
                    handleChange(`experience.${index}.company`, e.target.value)
                  }
                />
              </div>
              <div>
                <FormLabel>Job Title</FormLabel>
                <FormInput
                  type="text"
                  value={formData?.experience?.[index]?.jobTitle || ""}
                  onChange={(e) =>
                    handleChange(`experience.${index}.jobTitle`, e.target.value)
                  }
                />
              </div>
              <div>
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
              </div>

              <div>
                <FormLabel>End Date</FormLabel>
                <FormInput
                  type="Date"
                  value={formData?.experience?.[index]?.endDate || ""}
                  onChange={(e) =>
                    handleChange(`experience.${index}.endDate`, e.target.value)
                  }
                />
              </div>
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
