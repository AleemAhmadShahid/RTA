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
} from "../styles/MultiStepFormStyling";
import { EntriesDropdown, dropDownStyle } from "../styles/TableStyling";
import { createfileUploadRequest } from "../../global/helper";

const StepFour = ({ formData, handleChange }) => {
  const [liscenseAndCertifications, setLiscenseAndCertifications] = useState(
    []
  );
  const [documents, setDocuments] = useState([]);
  const documentsTypes = [
    "CV/Resume",
    "Offer Letter",
    "Contract",
    "Identification",
    "Certificate",
    "Other",
  ].map((option) => ({
    label: option,
    value: option,
  }));

  useEffect(() => {
    if (
      formData &&
      (formData.liscenseAndCertifications || formData.documents)
    ) {
      if (formData.liscenseAndCertifications)
        setLiscenseAndCertifications(formData.liscenseAndCertifications);
      if (formData.documents) setDocuments(formData.documents);
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
      <H6>Other Information</H6>
      <FormLabel>Liscense & Certifications</FormLabel>
      <Step3Container>
        <BoxStep3Container>
          {liscenseAndCertifications.map((item, index) => (
            <Step3BorderBox key={index}>
              <Step3CloseButton
                onClick={() =>
                  removeItem(
                    index,
                    setLiscenseAndCertifications,
                    liscenseAndCertifications,
                    "liscenseAndCertifications"
                  )
                }
              >
                ×
              </Step3CloseButton>

              <FormGroup>
                <FormLabel>Name</FormLabel>
                <FormInput
                  type="text"
                  value={
                    formData?.liscenseAndCertifications?.[index]?.name || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      `liscenseAndCertifications.${index}.name`,
                      e.target.value
                    )
                  }
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Issuing Authority</FormLabel>
                <FormInput
                  type="text"
                  value={
                    formData?.liscenseAndCertifications?.[index]
                      ?.issuingAuthority || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      `liscenseAndCertifications.${index}.issuingAuthority`,
                      e.target.value
                    )
                  }
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Issuance Date</FormLabel>
                <FormInput
                  type="Date"
                  value={
                    formData?.liscenseAndCertifications?.[
                      index
                    ]?.issuanceDate.split("T")[0] || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      `liscenseAndCertifications.${index}.issuanceDate`,
                      e.target.value
                    )
                  }
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Expiration Date</FormLabel>
                <FormInput
                  type="Date"
                  value={
                    formData?.liscenseAndCertifications?.[
                      index
                    ]?.expirationDate.split("T")[0] || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      `liscenseAndCertifications.${index}.expirationDate`,
                      e.target.value
                    )
                  }
                />
              </FormGroup>

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
                          `liscenseAndCertifications.${index}.attachment`,
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
        <Step3AddButton
          onClick={() =>
            addItem(setLiscenseAndCertifications, liscenseAndCertifications)
          }
        >
          Add Liscense and Certifications
        </Step3AddButton>
      </Step3Container>
      <FormLabel>Documents</FormLabel>
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
                <FormLabel>Name</FormLabel>
                <FormInput
                  type="text"
                  value={formData?.documents?.[index]?.name || ""}
                  onChange={(e) =>
                    handleChange(`documents.${index}.name`, e.target.value)
                  }
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Type</FormLabel>
                <EntriesDropdown
                  width="100%"
                  value={
                    (formData?.documents?.[index]?.type && {
                      label: formData?.documents?.[index]?.type,
                      value: formData?.documents?.[index]?.type,
                    }) || { label: "CV/Resume", value: "CV/Resume" }
                  }
                  onChange={(selectedOption) => {
                    handleChange(
                      `documents.${index}.type`,
                      selectedOption.value
                    );
                  }}
                  options={documentsTypes}
                  styles={dropDownStyle}
                />
              </FormGroup>

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
      </Step3Container>
    </FormStep>
  );
};

export default StepFour;
