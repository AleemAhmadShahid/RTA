import React, { useState, useEffect } from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  H6,
  Step3Container,
  BoxStep3Container,
  Step3CloseButton,
  Step3AddButton,
  Step3BorderBox,

} from "../../../styles/MultiStepFormStyling";
import {
  EntriesDropdown,
  dropDownStyle
  } from "../../../styles/TableStyling";
import { StyledErrorH6 } from "../../Login";

import { validateAlphanumericWithSpace } from "../../../global/validators";
import {
  createGetRequest,
} from "../../../global/requests";


const StepOne = ({ formData, errors, handleChange }) => {

  const [skills, setSkills] = useState([]);
  const [jobDescriptionSkills, setJobDescriptionSkills] = useState([]);
  const [keyResponsibilityAreas, setKeyResponsibilityAreas] = useState([]);

  useEffect(() => {
      if(formData.skills)
        setJobDescriptionSkills(formData.skills);
      if(formData.keyResponsibilityAreas)
        setKeyResponsibilityAreas(formData.keyResponsibilityAreas);
  }, []);

  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/jobDescription/criteria/");
        if (data.status === 404) {
          setSkills([]);
          return;
        }
        setSkills(data.criterias);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
    fetchData();
  }, []);

  const addItem = (setFunction, state) => {
    setFunction([...state, state.length]);
  };

  
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
      <H6 style={{ width: "300px" }}>Basic Information</H6>

      <FormGroup>
        <FormLabel>Title</FormLabel>
        <FormInput
          type="text"
          value={formData.name || ""}
          placeholder={" Title"}
          onChange={(e) =>
            handleChange("name", e.target.value, validateAlphanumericWithSpace)
          }
          onBlur={(e) =>
            handleChange("name", e.target.value, validateAlphanumericWithSpace)
          }
          required
        />
      </FormGroup>
      {errors.name && <StyledErrorH6>{errors.name}</StyledErrorH6>}

      <FormGroup>
          <FormLabel>Description</FormLabel>
          <textarea
            style={{ borderRadius: "5px" }}
            value={formData.description || ""}
            placeholder={" Job Description"}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4} 
            cols={35} 
          ></textarea>
      </FormGroup>
      

      <FormLabel>Skills</FormLabel>
      <Step3Container>
        <BoxStep3Container>
          {jobDescriptionSkills.map((item, index) => (
            <Step3BorderBox key={index}>
              <Step3CloseButton
                onClick={() =>
                  removeItem(
                    index,
                    setJobDescriptionSkills,
                    jobDescriptionSkills,
                    "skills"
                  )
                }
              >
                ×
              </Step3CloseButton>


              <FormGroup>
                <FormLabel>Skills</FormLabel>
                  <EntriesDropdown
                    width="100%"
                    value= {{
                      label: skills.find(item => item._id === formData?.skills?.[index]?.skill)?.name,
                      value: formData?.skills?.[index]?.skill
                    }}
                    onChange={(selectedOption) =>{
                        handleChange(
                          `skills.${index}.skill`,
                          selectedOption.value
                        );
                      }
                    }
                    options={skills.map((skill) => ({label: skill.name, value: skill._id}))}
                    styles={dropDownStyle}
                />
                
              </FormGroup>

                    
        
           
              <FormGroup>
                <FormLabel>Weightage</FormLabel>
                <FormInput
                  type="Number"
                  value={formData?.skills?.[index]?.weightage || ""}
                  onChange={(e) =>
                    handleChange(`skills.${index}.weightage`, e.target.value)
                  }
                />
              </FormGroup>

       

            </Step3BorderBox>
          ))}
        </BoxStep3Container>
        <Step3AddButton
          onClick={() => addItem(setJobDescriptionSkills, jobDescriptionSkills)}
        >
          Add Skill
        </Step3AddButton>
      </Step3Container>
      
      <FormLabel>KRA</FormLabel>
      <Step3Container>
        <BoxStep3Container>
          {keyResponsibilityAreas.map((item, index) => (
            <Step3BorderBox key={index}>
              <Step3CloseButton
                onClick={() =>
                  removeItem(
                    index,
                    setKeyResponsibilityAreas,
                    keyResponsibilityAreas,
                    "keyResponsibilityAreas"
                  )
                }
              >
                ×
              </Step3CloseButton>


              <FormGroup>
                <FormLabel>KRA</FormLabel>
                  <EntriesDropdown
                    width="100%"
                    value= {{
                      label: skills.find(item => item._id === formData?.keyResponsibilityAreas?.[index]?.keyResponsibilityArea)?.name,
                      value: formData?.keyResponsibilityAreas?.[index]?.keyResponsibilityArea
                    }}
                    onChange={(selectedOption) =>{
                        handleChange(
                          `keyResponsibilityAreas.${index}.keyResponsibilityArea`,
                          selectedOption.value
                        );
                      }
                    }
                    options={skills.map((keyResponsibilityArea) => ({label: keyResponsibilityArea.name, value: keyResponsibilityArea._id}))}
                    styles={dropDownStyle}
                />
                
              </FormGroup>

                    
        
           
              <FormGroup>
                <FormLabel>Weightage</FormLabel>
                <FormInput
                  type="Number"
                  value={formData?.keyResponsibilityAreas?.[index]?.weightage || ""}
                  onChange={(e) =>
                    handleChange(`keyResponsibilityAreas.${index}.weightage`, e.target.value)
                  }
                />
              </FormGroup>

       

            </Step3BorderBox>
          ))}
        </BoxStep3Container>
        <Step3AddButton
          onClick={() => addItem(setKeyResponsibilityAreas, keyResponsibilityAreas)}
        >
          Add KRAs
        </Step3AddButton>
      </Step3Container>
      

      
    </FormStep>
  );
};

export default StepOne;
