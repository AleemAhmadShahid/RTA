import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Switch from "../components/Switch";
import { useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";

import { BoxContainer } from "../pages/styles/TableStyling";
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
} from "../pages/styles/MultiStepFormStyling";
export const LeftColumn = styled.div`
  flex: 1;
  padding-right: 10px;
  // width:100%;
  @media (max-width: 845px) {
    padding-right: 0; /* Reset padding for mobile view */
  }
`;

export const RightColumn = styled.div`
  flex: 1;
  padding-left: 10px;

  @media (max-width: 845px) {
    padding-left: 0; /* Reset padding for mobile view */
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 845px) {
    /* Apply styles for screens with a maximum width of 845px (adjust as needed) */
    flex-direction: column; /* Stack columns vertically for mobile */
    // align-items: center; /* Center-align columns in mobile view */
    // width:100%;
  }
`;
export const ColumnContainer1 = styled.div`
  // display: flex;
  width: 100%;

  @media (max-width: 845px) {
    /* Apply styles for screens with a maximum width of 845px (adjust as needed) */
    flex-direction: column; /* Stack columns vertically for mobile */
    // align-items: center; /* Center-align columns in mobile view */
    // width:100%;
  }
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
  display: flex;
  gap: 5px;

  @media (max-width: 845px) {
    flex-direction: column;
    align-items: left;
  }
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
  margin-bottom: 10px;
  font-size: small;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: red;
  }
`;
const Warningbox = styled.div`
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background: #fdf1dc;
  color: #ffa500;
  // margin-left:10px;
`;
const Image = styled.img`
  width: 330px !important;
  height: 247px !important;
  object-fit: contain;
  display: block;
  margin: auto;
  background-color: #ededed;
`;
const APIbox = styled.div`
  position: relative; /* To position the button relative to this container */
  background-color: #ededed;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
`;
const APIOptionsButton = styled.button`
  position: absolute;
  top: 10px; /* Adjust the top position as needed */
  right: 10px; /* Adjust the right position as needed */
  background: none;
  border: none;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  display: block;
  margin-top: 10px; /* Add margin for spacing */
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const TimeInputContainer = styled.div`
  display: flex;
  // align-items: center;
  margin-top: 0px; /* Add margin for spacing between the fields */
`;

const TimeInput = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 0 20px;
  padding: 5px;
  width: 100%;
  outline: none;
`;
const Colon = styled.span`
  font-size: 20px; /* Adjust the font size as needed */
  margin: 0 5px; /* Add spacing around the colon */
`;
const InvisibleElement = styled.div`
  visibility: hidden;
  height: 75px;
  width: 100px;
  @media (max-width: 845px) {
    display: none;
    visibility: hidden;
    height: 0;
    width: 0;
  }
`;


const AccountSettings = () => {


    const [user, setUser] = useState(useSelector((state) => state.user));
    const [buttonClicked, setButtonClicked] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const handleButtonClick = (buttonName) => {
        // Handle button click logic
        setButtonClicked(buttonName);
      };
    
      const handleCheckboxChange = (event) => {
        // Handle checkbox change logic
        setIsChecked(event.target.checked);
      };

    const handleDeactivateDelete = () => {
        // Handle deactivate or delete logic based on buttonClicked
        if (buttonClicked === "Deactivate") {
          // Handle deactivation
        } else if (buttonClicked === "Delete") {
          // Handle deletion
        }
      };

return (
    <>
      <BoxContainer>
        <Box>
          <H6>Profile Details</H6>
          <hr />
          <UploadContainer style={{ marginBottom: "20px" }}>
            <UploadBox />
            <PictureUploadButton style={{ fontSize: "14px" }}>
              Upload
            </PictureUploadButton>

            <ResetButton> Reset</ResetButton>
          </UploadContainer>

          <div style={{ display: "flex" }}>
            <ColumnContainer>
              <LeftColumn style={{ marginBottom: "20px" }}>
                <FormGroup>
                  <FormLabel>Name:</FormLabel>
                  <FormInput
                    type="text"
                    value={user.user.name}
                    placeholder={" "}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Email:</FormLabel>
                  <FormInput
                    type="email"
                    value={user.user.email}
                    disabled={"disabled"}
                    placeholder={"ABC@emaple.com"}
                  />
                </FormGroup>
              </LeftColumn>
              <RightColumn>
                <FormGroup>
                  <FormLabel>Phone:</FormLabel>
                  <FormInput
                    type="tel"
                    value={user.user.phoneNo[0]}
                    placeholder={"+92"}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Address:</FormLabel>
                  <FormInput type="text" placeholder={"ABC STREET"} />
                </FormGroup>
              </RightColumn>
            </ColumnContainer>
          </div>
          <FormButton style={{ marginBottom: "10px" }}>
            Save changes
          </FormButton>
          <PreviousButton> Discard</PreviousButton>
        </Box>
      </BoxContainer>

      <ButtonContainer>
        <StyledButton
          onClick={() => handleButtonClick("Deactivate")}
          currentPage={buttonClicked === "Deactivate" ? "Deactivate" : ""}
        >
          <AiOutlineUser />
          Deactivate
        </StyledButton>

        <StyledButton
          onClick={() => handleButtonClick("Delete")}
          currentPage={buttonClicked === "Delete" ? "Delete" : ""}
        >
          <AiOutlineUser />
          Delete
        </StyledButton>
      </ButtonContainer>

      <BoxContainer visible={buttonClicked !== null}>
        <Box>
          {buttonClicked === "Deactivate" && (
            <CheckboxLabel style={{ marginBottom: "10px" }}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />{" "}
              I confirm my account deactivation
            </CheckboxLabel>
          )}

          {buttonClicked === "Delete" && (
            <CheckboxLabel style={{ marginBottom: "10px" }}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />{" "}
              I confirm my account deletion
            </CheckboxLabel>
          )}

          {isChecked && (
            <>
              <Warningbox>
                <P style={{ fontWeight: "bold", marginLeft: "10px" }}>
                  Are you sure you want to {buttonClicked.toLowerCase()}{" "}
                  this account
                </P>
                {(buttonClicked == "Delete" && (
                  <P style={{ marginLeft: "10px" }}>
                    Once you {buttonClicked.toLowerCase()} the account there
                    is no going back
                  </P>
                )) || (
                  <P style={{ marginLeft: "10px" }}>
                    You can contact administrator to reactivate your account
                  </P>
                )}
              </Warningbox>
              <ColumnContainer>
                <LeftColumn>
                  <FormLabel>Enter password:</FormLabel>
                  <FormInput type="password" />
                  <DeactivateButton onClick={handleDeactivateDelete}>
                    {buttonClicked === "Deactivate"
                      ? "Deactivate"
                      : "Delete"}
                  </DeactivateButton>
                </LeftColumn>
                <RightColumn></RightColumn>
              </ColumnContainer>
            </>
          )}
        </Box>
      </BoxContainer>
    </>
  );
} ;

export default AccountSettings;