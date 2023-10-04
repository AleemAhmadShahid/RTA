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

import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
const LargeIcon = styled.span`
  font-size: 24px; /* Adjust the icon size as needed */
`;
const LeftColumn = styled.div`
  flex: 1;
  padding-right: 10px;
`;

const RightColumn = styled.div`
  flex: 1;
  padding-left: 10px;
`;
const Box = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;
const StyledButton = styled.button`
  background-color: #f5f5f5;
  color: #000;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease;

  /* Conditional styles based on currentPage */
  ${(props) =>
    props.currentPage === props.page
      ? `
    background-color: #ffa500;
    color: #fff;
  `
      : ""}

  &:hover {
    background-color: #ffa500;
    color: #fff;
  }
`;
const ResetButton = styled.button`
  background-color: #0000;
  color: #00000;
  border: 1px solid #000000;
  border-radius: 5px;

  margin-right: 5px;
  padding: 2px 20px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ededed;
    color: #000000;
  }
`;

const ButtonContainer = styled.div`
  display: flex; /* Make the buttons a flex container */
  gap: 5px; /* Add some spacing between the buttons */
`;
const H6 = styled.h6`
  margin-top: 15px;
  margin-bottom: 15px;
`;
const DeactivateButton = styled.button`
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-top: 5px;
  margin-right: 5px;
  padding: 10px 20px;
  margin-bottom:10px;
  font-size: small;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: red;
  }
`;
// const qaring

// const isButtonHighlighted = (currentPage, page) => {
//     return currentPage === page;
//   };
const EmpSetting = () => {
  const [currentPage, setCurrentPage] = useState("account");
  const renderContent = () => {
    if (currentPage === "account") {
      return (
        <>
          <BoxContainer>
            <Box>
              <H6>Profile Details</H6>
              <hr />
              <UploadContainer>
                <UploadBox />
                <PictureUploadButton style={{ fontSize: "14px" }}>
                  Upload
                </PictureUploadButton>

                <ResetButton> Reset</ResetButton>
              </UploadContainer>

              <div style={{ display: "flex" }}>
                <LeftColumn>
                  <FormGroup>
                    <FormLabel>First Name:</FormLabel>
                    <FormInput type="text" placeholder={" "} />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Last Name:</FormLabel>
                    <FormInput type="text" name="lastName" />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Email:</FormLabel>
                    <FormInput type="email" placeholder={"ABC@emaple.com"} />
                  </FormGroup>
                </LeftColumn>
                <RightColumn>
                  <FormGroup>
                    <FormLabel>Phone:</FormLabel>
                    <FormInput type="tel" placeholder={"+92"} />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Address:</FormLabel>
                    <FormInput type="text" placeholder={"ABC STREET"} />
                  </FormGroup>
                </RightColumn>
              </div>
              <FormButton >Save changes</FormButton>
              <PreviousButton> Discard</PreviousButton>
            </Box>
          </BoxContainer>
          <BoxContainer>
            <Box>
              <H6>Delete Account</H6>
              <hr />
              <Box style={{background:'#fbe6bf' ,color:'#ffa500'}}>
              <P>Are you sure you want to delete this account</P>
              <P>Once you delete thi accoun there is no going back</P>
              </Box>
              <div>
                <input style={{marginRight:'6px'}}type="checkbox" id="deleteConfirmation" />
                <label for="deleteConfirmation">
                  Are you sure you want to delete the account?
                </label>
              </div>
              <DeactivateButton>Deactivate Account</DeactivateButton>
            </Box>
          </BoxContainer>
          <hr />
        </>
      );
    } else if (currentPage === "security") {
      return (
        <BoxContainer>
  <Box>
    <H6>Change Password</H6>
    <hr />

    <div style={{ display: "flex" }}>
                <LeftColumn>
      <FormGroup>
        <FormLabel>Current Password:</FormLabel>
        <FormInput type="password" id="currentPassword" />
      </FormGroup>

      <FormGroup>
        <FormLabel>New Password:</FormLabel>
        <FormInput type="password" id="newPassword" />
      </FormGroup>
      </LeftColumn>

      <RightColumn>
      <FormGroup>
        <FormLabel>Retype Password:</FormLabel>
        <FormInput type="password" id="confirmPassword" />
      </FormGroup>
      </RightColumn>
      </div>
      <div>
        <H6>Password Requirements</H6>
        <ul>
          <li>Minimum 8 characters</li>
          <li>At least one lowercase letter</li>
          <li>At least one number</li>
        </ul>
      </div>

      <div>
        <FormButton>Save</FormButton>
        <PreviousButton>Discard</PreviousButton>
      </div>    
  </Box>
</BoxContainer>

      );
    } else if (currentPage === "AccountBilling & Plans"){
      // Handle other pages similarly
      return null;
    } else if (currentPage === "notifications") {
        return (
          <Box>
            <P>Notification Settings</P>
            {/* ... Notification settings content ... */}
          </Box>
        );
      } else if (currentPage === "connections") {
        return (
          <Box>
            <P>Connections</P>
            {/* ... Connections content ... */}
          </Box>
        );
      }
  };

  return (
    <CenteredContainer>
      <Heading>Account Settings</Heading>
      <ButtonContainer>
        <StyledButton
          currentPage={currentPage}
          page="account"
          onClick={() => setCurrentPage("account")}
        >
          <AiOutlineUser />
          Account
        </StyledButton>

        <StyledButton
          currentPage={currentPage}
          page="security"
          onClick={() => setCurrentPage("security")}
        >
          <BiLockAlt /> Security
        </StyledButton>

        <StyledButton currentPage={currentPage} page="AccountBilling & Plans" onClick={() => setCurrentPage("AccountBilling & Plans")}>
          {" "}
          AccountBilling & Plans
        </StyledButton>

        <StyledButton currentPage={currentPage} page="Notifications" onClick={() => setCurrentPage("Notifications")} >
          {" "}
          <IoMdNotificationsOutline />
          Notifications
        </StyledButton>

        <StyledButton currentPage={currentPage} page="Connections" onClick={() => setCurrentPage("Connections")}>
          Connections
        </StyledButton>
      </ButtonContainer>

      {/* <BoxContainer>   */}
      {renderContent()}
      {/* </BoxContainer> */}
    </CenteredContainer>
  );
};

export default EmpSetting;
