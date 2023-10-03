import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CenteredContainer, BoxContainer } from "./styles/TableStyling";
import {
  Heading,
  FormButton,
  PreviousButton,
  P,
  UploadBox,
  PictureUploadButton,
  UploadContainer,
  TextContainer,
  FormLabel,
  FormInput,
  FormHalfInput,
  FormGroup,
} from "./styles/MultiStepFormStyling";

const LeftColumn = styled.div`
  flex: 1;
  padding-right: 10px;
`;

const RightColumn = styled.div`
  flex: 1;
  padding-left: 10px;
`;
const Box=styled.div`
margin-left:20px;
margin-right:20px;
`


const EmpSetting = () => {
    const [currentPage, setCurrentPage] = useState("account"); 
    const renderContent = () => {
        if (currentPage === "account") {
          return (
            <Box>
              <P>Profile Details</P>
              <UploadContainer>
          <UploadBox />
          <PictureUploadButton> Upload</PictureUploadButton>
          <PictureUploadButton> Reset</PictureUploadButton>
        </UploadContainer>
        
        <div style={{ display: "flex" }}>
          <LeftColumn>
            <FormGroup>
              <FormLabel >First Name:</FormLabel>
              <FormInput type="text" placeholder={" "} />
            </FormGroup>
            <FormGroup>
              <FormLabel >Last Name:</FormLabel>
              <FormInput type="text" name="lastName" />
            </FormGroup>
            <FormGroup>
              <FormLabel >Email:</FormLabel>
              <FormInput type="email"  placeholder={"ABC@emaple.com"}/>
            </FormGroup>
          </LeftColumn>
          <RightColumn>
            <FormGroup>
              <FormLabel >Phone:</FormLabel>
              <FormInput type="tel" placeholder={"+92"} />
            </FormGroup>
            <FormGroup>
              <FormLabel >Address:</FormLabel>
              <FormInput type="text" placeholder={"ABC STREET"} />
            </FormGroup>
          </RightColumn>
        </div>
            </Box>
          );
        } else if (currentPage === "security") {
          return (
            <Box>
              <P>Security Details</P>
              {/* ... Security details form ... */}
            </Box>
          );
        } else {
          // Handle other pages similarly
          return null;
        }
      };

  return (
    <CenteredContainer>
      <Heading>Account Settings</Heading>
      <FormButton onClick={() => setCurrentPage("account")}> Account</FormButton>
      <FormButton onClick={() => setCurrentPage("security")}> Security</FormButton>
      <FormButton> AccountBilling & Plans</FormButton>
      <FormButton> Notifications</FormButton>
      <FormButton> Connections</FormButton>
    
      <BoxContainer >
       
        {renderContent()}
       
        <FormButton>save changes</FormButton>
        <PreviousButton> Discard</PreviousButton>
        
      </BoxContainer>
    </CenteredContainer>
  );
};

export default EmpSetting;
