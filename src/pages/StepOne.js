import React from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  FormHalfInput,
  FormButton,
} from "./multistepformstyling";
import { StyledErrorH6 } from "./Login";
import { styled } from "styled-components";

const H6 = styled.h6`
  margin-top: 10px; /* Add top margin */
  margin-bottom: 20px;
`;
const PictureUploadButton = styled.label`
  background-color: #ffa500;
  color: #fff;
  padding: 3px 12px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;
  margin-right: 20px;

  input[type='file'] {
    display: none;
  }

  &:hover {
    background-color: #ff8000;
  }
`;

const UploadBox = styled.div`
  background-color: #ededed;
  padding: 5px;
  border: 1px solid #ededed;
  border-radius: 5px;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  overflow: hidden;
`;


const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 20px; /* Add margin to separate button and box */
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: flex-start;/* Center horizontally */
`;
const P=styled.p`
font-size:15px;
margin-left:10px;
`
const StepOne = ({ formData, errors, handleChange }) => {
  return (
    <FormStep active>
      <H6>Personal Information</H6>

      <FormGroup>
  <UploadContainer>
    <UploadBox>
      {formData.picture ? (
        <img
          src={formData.picture}
          alt="Uploaded"
          style={{
            maxWidth: "50%",
            maxHeight: "50%",
          }} 
        />
      ) : (
        <P>90x90</P>
      )}
    </UploadBox>
    <TextContainer>
    <PictureUploadButton>
        Upload Picture
        <input
          type="file"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
          }}
        />
      </PictureUploadButton>
      <P>Allowed max size of 10MB</P>
    </TextContainer>
  </UploadContainer>
</FormGroup>

      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormInput
          type="text"
          value={formData.name || ""}
          placeholder={" Name"}
          onChange={(e) => handleChange("name", e.target.value, true)}
          onBlur={(e) => handleChange("name", e.target.value, true)}
          required
        />
      </FormGroup>
      {errors.name && <StyledErrorH6>{errors.name}</StyledErrorH6>}
      {/* <FormGroup>
        <FormLabel>Email</FormLabel>
        <FormInput
          type="email"
          value={formData.email || ""}
          placeholder={" user@example.com"}
          onBlur={(e) => handleChange("email", e.target.value, true)}
          onChange={(e) => handleChange("email", e.target.value, true)}
        />
      </FormGroup> */}
      {errors.email && <StyledErrorH6>{errors.email}</StyledErrorH6>}
      <FormGroup>
        <FormLabel>Phone Number</FormLabel>
        <FormInput
          type="text"
          value={formData.phoneNumber || ""}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          placeholder={" +92"}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Date of Birth</FormLabel>
        <FormInput
          type="date"
          value={formData.dob || ""}
          onChange={(e) => handleChange("dob", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Address</FormLabel>
        <FormInput
          type="text"
          value={(formData.address && formData.address.street) || ""}
          onChange={(e) => handleChange("address.street", e.target.value)}
          placeholder={" Street"}
        />
      </FormGroup>
      <FormGroup>
          <div style={{ display: 'flex',width: "95%" }}>
          <FormHalfInput type="text" value={formData.address && formData.address.city || ""}
          onChange={(e) => handleChange("address.city", e.target.value)} placeholder=" City" style={{ marginRight: '10px' }} />
          <FormHalfInput type="text" value={formData.address && formData.address.zipCode || ""}
          onChange={(e) => handleChange("address.zipCode", e.target.value)} placeholder=" Zip Code" />
        </div>
      </FormGroup>

      {/* <FormButton>Next</FormButton> */}
    </FormStep>
  );
};

export default StepOne;
