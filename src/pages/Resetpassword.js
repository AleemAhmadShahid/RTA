import React, { useState } from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  FormButton,
} from "./multistepformstyling";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const H6 = styled.h6`
  margin-top: 10px; /* Add top margin */
  margin-bottom: 20px;
`;

const StepOne = ({ formData, handleChange }) => {
  return (
    <FormStep active>
      <H6>Form 1</H6>
      <FormGroup>
        <FormLabel>Field 1</FormLabel>
        <FormInput
          type="text"
          value={formData.field1 || ""}
          onChange={(e) => handleChange("field1", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Field 2</FormLabel>
        <FormInput
          type="text"
          value={formData.field2 || ""}
          onChange={(e) => handleChange("field2", e.target.value)}
        />
      </FormGroup>
      <FormButton>Button 1</FormButton>
    </FormStep>
  );
};

const StepTwo = ({ formData, handleChange }) => {
  return (
    <FormStep active>
      <H6>Form 2</H6>
      <FormGroup>
        <FormLabel>Field 3</FormLabel>
        <FormInput
          type="text"
          value={formData.field3 || ""}
          onChange={(e) => handleChange("field3", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Field 4</FormLabel>
        <FormInput
          type="text"
          value={formData.field4 || ""}
          onChange={(e) => handleChange("field4", e.target.value)}
        />
      </FormGroup>
      <FormButton>Button 2</FormButton>
    </FormStep>
  );
};
const Resetpassword=()=>{

    const [formData1, setFormData1] = useState({});
    const [formData2, setFormData2] = useState({});
  
    const handleChange1 = (field, value) => {
      setFormData1({ ...formData1, [field]: value });
    };
  
    const handleChange2 = (field, value) => {
      setFormData2({ ...formData2, [field]: value });
    };
  
    return (
      <Container>
        <StepOne formData={formData1} handleChange={handleChange1} />
        <StepTwo formData={formData2} handleChange={handleChange2} />
      </Container>
    );
  };

export default Resetpassword;