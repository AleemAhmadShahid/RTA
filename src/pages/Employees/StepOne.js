import React from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  FormHalfInput,
 
  H6,
  PictureUploadButton,
  UploadBox,
  UploadContainer,
  TextContainer,
  P,
} from "../styles/MultiStepFormStyling";
import { StyledErrorH6 } from "../Login";

import {  createfileUploadRequest } from "../../global/requests";
import {  validateAlphabeticWithSpace, validateEmail, validateNumeric } from "../../global/validators";

const StepOne = ({ formData, errors, handleChange }) => {
  return (
    <FormStep active>
      <H6>Personal Information</H6>

      <FormGroup>
        <UploadContainer>
          <UploadBox>
            {formData.profileImg ? (
              <img
                src={formData.profileImg}
                alt="Uploaded"
                style={{
                  width: "90px",
                  height: "90px",
                }}
              />
            ) : (
              <P>90x90</P>
            )}
          </UploadBox>
          <TextContainer>
            <PictureUploadButton>
              Upload Picture
              <input type="file" onChange={async (e) => {
                const file = e.target.files[0]; 
                const formData = new FormData();
                formData.append('file', file);
                const response = await createfileUploadRequest(formData);
                if (response.status === 200)
                  handleChange("profileImg", response.url || response.id, true)
                
              }} />
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
          onChange={(e) => handleChange("name", e.target.value, validateAlphabeticWithSpace)}
          onBlur={(e) => handleChange("name", e.target.value, validateAlphabeticWithSpace)}
          required
        />
      </FormGroup>
      {errors.name && <StyledErrorH6>{errors.name}</StyledErrorH6>}
      <FormGroup>
        <FormLabel>Email</FormLabel>
        <FormInput
          type="email"
          value={formData.email || ""}
          placeholder={" user@example.com"}
          onBlur={(e) => handleChange("email", e.target.value, validateEmail)}
          onChange={(e) => handleChange("email", e.target.value, validateEmail)}
          disabled={formData._id !== undefined}
        />
      </FormGroup>
      {errors.email && <StyledErrorH6>{errors.email}</StyledErrorH6>}
      <FormGroup>
        <FormLabel>Password</FormLabel>
        <FormInput
          type="password"
          value={formData.password || ""}
          placeholder={""}
          onChange={(e) => handleChange("password", e.target.value, true)}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Phone Number</FormLabel>
        <FormInput
          type="text"
          value={formData?.phoneNo?.[0] || ""}
          onChange={(e) => handleChange("phoneNo.0", e.target.value)}
          placeholder={" +92"}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Date of Birth</FormLabel>
        <FormInput
          type="date"
          value={(formData.dateOfBirth && formData.dateOfBirth.split('T')[0]) || ""}
          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
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
        <div style={{ display: "flex", width: "100%" }}>
          <FormHalfInput
            type="text"
            value={(formData.address && formData.address.city) || ""}
            onChange={(e) => handleChange("address.city", e.target.value)}
            placeholder=" City"
            style={{ marginRight: "10px" }}
          />
          <FormHalfInput
            type="text"
            value={(formData.address && formData.address.zipCode) || ""}
            onChange={(e) => handleChange("address.zipCode", e.target.value, validateNumeric)}
            placeholder=" Zip Code"
          />
        </div>
        <FormInput
          style={{ marginTop: "13px" }}
          type="text"
          value={(formData.address && formData.address.country) || ""}
          onChange={(e) => handleChange("address.country", e.target.value)}
          placeholder={" Country"}
        />
      </FormGroup>
      {errors?.address?.zipCode && <StyledErrorH6>{errors.address.zipCode}</StyledErrorH6>}
      

      {/* <FormButton>Next</FormButton> */}
    </FormStep>
  );
};

export default StepOne;
