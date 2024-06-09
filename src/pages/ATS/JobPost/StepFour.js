import React, { useState, useEffect } from "react";

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
} from "../../../styles/MultiStepFormStyling";
import { EntriesDropdown, dropDownStyle } from "../../../styles/TableStyling";
import { createfileUploadRequest } from "../../../global/requests";

const StepFour = ({ formData, handleChange }) => {
  
  const [documents, setDocuments] = useState([]);


  useEffect(() => {
    if (
      formData &&
      (formData.documents)
    ) {
    
      if (formData.documents) setDocuments(formData.documents);
    }
  }, []);

  const addItem = (setFunction, state) => {
    setFunction([...state, state.length]);
  };

  
  const removeItem = (index, setFunction, state, key) => {
    const newState = [...state];
    newState.splice(index, 1);
    setFunction(newState);

  
    if (Array.isArray(formData[key])) {
      const newData = [...formData[key]];
      newData.splice(index, 1);
      handleChange(key, newData);
    }
  };

  return (
    <FormStep active>
      <H6>Other Information</H6>
      <FormGroup>
        <FormLabel>Benefits</FormLabel>
        <textarea
            style={{ borderRadius: "5px" }}
            value={formData.benefits || ""}
            placeholder={" Benefits"}
            onChange={(e) => handleChange("benefits", e.target.value)}
            rows={6} 
            cols={40} 
        ></textarea>
      </FormGroup>

      {/* <FormLabel>Attachements</FormLabel>
      <Step3Container>
        <BoxStep3Container>
          {documents.map((item, index) => (
            <Step3BorderBox key={index}>
              <Step3CloseButton
                onClick={() =>
                  removeItem(index, setDocuments, documents, "documents")
                }
              >
                ×
              </Step3CloseButton>
              <FormGroup>
                <PictureUploadButton>
                  Upload Document
                  <input
                    type="file"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      const formData = new FormData();
                      formData.append("file", file);
                      const response = await createfileUploadRequest(formData);
                      if (response.status === 200)
                        handleChange(
                          `documents.${index}.attachment`,
                          response.id,
                          true
                        );
                    }}
                  />
                </PictureUploadButton>
              </FormGroup>
            </Step3BorderBox>
          ))}
        </BoxStep3Container>
        <Step3AddButton onClick={() => addItem(setDocuments, documents)}>
          Add Document
        </Step3AddButton>
      </Step3Container> */}
    </FormStep>
  );
};

export default StepFour;
