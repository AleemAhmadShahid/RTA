import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Switch from "../components/Switch";
import {
  CenteredContainer,
  BoxContainer,
  Th,
  Tr,
  TableContainer,
  Table,
  Td,
  SuccessBadge,
  DangerBadge,
} from "./styles/TableStyling";
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
import { BiLockAlt, BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
const LargeIcon = styled.span`
  font-size: 24px; /* Adjust the icon size as needed */
`;
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

const Timer = ({ switchState }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleStartTimeChange = (event) => {
    const input = event.target.value;

    if (/^\d*$/.test(input) && input.length <= 4) {
      setStartTime(input);
    }
  };

  const handleEndTimeChange = (event) => {
    const input = event.target.value;

    if (/^\d*$/.test(input) && input.length <= 4) {
      setEndTime(input);
    }
  };

  if (switchState) {
    return null;
  }

  return (
    <>
      <TimeInputContainer>
        <TimeInput
          type="text"
          placeholder="Start Time"
          value={startTime}
          onChange={handleStartTimeChange}
        />
        <Colon>-</Colon>
        <TimeInput
          type="text"
          placeholder="End Time"
          value={endTime}
          onChange={handleEndTimeChange}
        />
      </TimeInputContainer>
    </>
  );
};

const GoogleImageWithTextAndSwitch = ({ imageUrl, text }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={imageUrl} alt="IMG" width={35} height={35} />
        <span style={{ marginLeft: "10px" }}>{text}</span>
      </div>
      <div>
        <Switch />
      </div>
    </div>
  );
};
const AccountSetting = () => {
  const [user, setUser] = useState(useSelector((state) => state.user));
  const [buttonClicked, setButtonClicked] = useState("Deactivate");
  const [isChecked, setIsChecked] = useState(false);
  const handleButtonClick = (buttonName) => {
    setButtonClicked(buttonName);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleDeactivateDelete = () => {
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
          <FormButton style={{ marginBottom: "10px" }}>Save changes</FormButton>
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
                  Are you sure you want to {buttonClicked.toLowerCase()} this
                  account
                </P>
                {(buttonClicked == "Delete" && (
                  <P style={{ marginLeft: "10px" }}>
                    Once you {buttonClicked.toLowerCase()} the account there is
                    no going back
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
                    {buttonClicked === "Deactivate" ? "Deactivate" : "Delete"}
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
};
const SecuritySetting = () => {
  return (
    <>
      <BoxContainer>
        <Box>
          <H6>Change Password</H6>
          <hr />

          <div style={{ display: "flex" }}>
            <ColumnContainer>
              <LeftColumn>
                <FormGroup>
                  <FormLabel>Current Password:</FormLabel>
                  <FormInput type="password" id="currentPassword" />
                </FormGroup>

                <FormGroup>
                  <FormLabel>New Password:</FormLabel>
                  <FormInput type="password" id="password" />
                </FormGroup>
              </LeftColumn>

              <RightColumn>
                <InvisibleElement>
                  <FormGroup>
                    <FormLabel>Retype Password:</FormLabel>
                    <FormInput type="password" id="nonepassword" />
                  </FormGroup>
                </InvisibleElement>
                <FormGroup>
                  <FormLabel>Retype Password:</FormLabel>
                  <FormInput type="password" id="confirmPassword" />
                </FormGroup>
              </RightColumn>
            </ColumnContainer>
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
            <FormButton style={{ marginBottom: "10px" }}>Save</FormButton>
            <PreviousButton>Discard</PreviousButton>
          </div>
        </Box>
      </BoxContainer>
      <BoxContainer>
        <Box>
          <H6>Two-Step Verification</H6>
          <hr />
          <ColumnContainer>
            <LeftColumn>
              <P style={{ fontWeight: "bold", fontSize: "13px" }}>
                Two-factor authentication is not yet enabled.
              </P>
              <P style={{ fontSize: "13px" }}>
                Two-factor authentication adds an additional layer of security
                to your account by requiring more than just a password to log
                in. <span>Learn more</span>
              </P>
            </LeftColumn>
            <RightColumn></RightColumn>
          </ColumnContainer>

          <FormButton style={{ marginBottom: "10px" }}>
            Enable Two-Factor Authentication
          </FormButton>
        </Box>
      </BoxContainer>

      <BoxContainer>
        <Box>
          <H6>Create an API Key</H6>

          <ColumnContainer>
            <LeftColumn>
              <FormGroup>
                <FormLabel>Choose the API Key:</FormLabel>
                <FormInput type="text" id="apiKey" />
              </FormGroup>

              <FormGroup>
                <FormLabel>Name the API Key:</FormLabel>
                <FormInput type="text" id="apiKeyName" />
              </FormGroup>

              <FormButton>Create Key</FormButton>
            </LeftColumn>
            <RightColumn>
              <Image src="/API.jpg" alt="API Key Image" />
            </RightColumn>
          </ColumnContainer>
        </Box>
      </BoxContainer>
      <BoxContainer>
        <Box>
          <H6>API Key List & Access</H6>
          <P>
            An API key is a simle encrypted string that identifies an
            application without any principal. They are usefull for accessing
            public data anonmymously, and are used to associate API requests
            with your project for quota and billing
          </P>
        </Box>
        <APIbox>
          <APIOptionsButton>
            <BiDotsVerticalRounded />
          </APIOptionsButton>

          <P style={{ display: "inline-block", marginRight: "10px" }}>
            {" "}
            Server Key 1
          </P>
          <SuccessBadge>Full Access</SuccessBadge>
          <P style={{ fontWeight: "bold" }}>23e-333-3434-343-4a-asdasd-3ed3d</P>
          <P>Created on Apr,2020,18:20,GTM+4:10</P>
        </APIbox>
      </BoxContainer>

      <hr />
    </>
  );
};
const NotificationsSetting = () => {
  return (
    <BoxContainer>
      <Box>
        <H6>Notification</H6>
        <hr />
        <p style={{ fontSize: "13px" }}>
          We need permission from your browser to show notifications. Request
          permission:
        </p>

        <TableContainer>
          <Table>
            <thead>
              <Tr>
                <Th>Type</Th>
                <Th>Email</Th>
                <Th>Browser</Th>
                <Th>APP</Th>
              </Tr>
            </thead>
            <tbody>
              <Td>New of you</Td>
              <Td>
                <input type="checkbox" />
              </Td>
              <Td>
                <input type="checkbox" />
              </Td>
              <Td>
                <input type="checkbox" />
              </Td>
            </tbody>
          </Table>
        </TableContainer>
        <ColumnContainer>
          <LeftColumn>
            <FormGroup>
              <FormLabel>When should we send you notifications?</FormLabel>
              <FormInput type="text" id="notificationTiming" />
            </FormGroup>
          </LeftColumn>
          <RightColumn></RightColumn>{" "}
        </ColumnContainer>
        <div>
          <FormButton style={{ marginBottom: "10px" }}>Save Changes</FormButton>
          <PreviousButton>Discard</PreviousButton>
        </div>
      </Box>
    </BoxContainer>
  );
};

const BillingSetting = () => {
  return (
    <Box>
      <P>Notification Settings</P>
    </Box>
  );
};

const ConnectionSetting = () => {
  return (
    <BoxContainer>
      <Box>
        <H6>Connected Accounts</H6>
        <P>Display content from your connected accounts on your site</P>

        <GoogleImageWithTextAndSwitch imageUrl="/Googlepng.png" text="Google" />
        <GoogleImageWithTextAndSwitch imageUrl="/Slack.png" text="Slack" />
      </Box>
    </BoxContainer>
  );
};

const CompanySetting=()=>{
  const initialSwitchStates = {
    Monday: false,
    Tuesday: false,
    Wednesday: false,
  };
  const [switchStates, setSwitchStates] = useState(initialSwitchStates);

  const handleSwitchChange = (day) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };
  
  return (
    <>
      <BoxContainer>
        <Box>
          <H6>Company Logo</H6>
          <UploadContainer style={{ marginBottom: "20px" }}>
            <UploadBox />
            <PictureUploadButton style={{ fontSize: "14px" }}>
              Upload
            </PictureUploadButton>

            <ResetButton> Reset</ResetButton>
          </UploadContainer>
          <ColumnContainer>
            <LeftColumn>
              <FormGroup>
                <FormLabel>E-mail</FormLabel>
                <FormInput type="text" placeholder={" "} />
              </FormGroup>
            </LeftColumn>
            <RightColumn>
              <FormGroup>
                <FormLabel>Company</FormLabel>
                <FormInput type="text" />
              </FormGroup>
            </RightColumn>
          </ColumnContainer>
          <FormButton>Save changes</FormButton>
          <PreviousButton style={{ marginBottom: "10px" }}>
            {" "}
            Reset
          </PreviousButton>
        </Box>
      </BoxContainer>

      <BoxContainer>
        <Box>
          <H6>Operating Hours</H6>
          <ColumnContainer1>
            {/* <LeftColumn> */}
            <div>
              {Object.keys(switchStates).map((day) => (
                <div key={day}>
                  <SwitchContainer>
                    <Switch
                      checked={switchStates[day]}
                      onChange={() => handleSwitchChange(day)}
                    />
                    <span>{day}</span>

                    {switchStates[day] ? (
                      <div
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <SuccessBadge>Opens</SuccessBadge>
                        <Timer isBadgeOpen={switchStates[day]} />
                      </div>
                    ) : (
                      <div style={{ marginLeft: "auto" }}>
                        <DangerBadge>Closed</DangerBadge>
                      </div>
                    )}
                  </SwitchContainer>
                </div>
              ))}
            </div>
            {/* </LeftColumn> */}
          </ColumnContainer1>

          <FormButton style={{ marginBottom: "10px" }}>
            Save Changes
          </FormButton>
        </Box>
      </BoxContainer>
      <hr />
    </>
  );
}

const EmpSetting = () => {
  const [currentPage, setCurrentPage] = useState("account");

 

 
  const renderContent = () => {
    if (currentPage === "account") {
      return <AccountSetting />;
    } else if (currentPage === "security") {
      return <SecuritySetting />;
    } else if (currentPage === "Notifications") {
      return <NotificationsSetting />;
    } else if (currentPage === "AccountBilling & Plans") {
      return <BillingSetting />;
    } else if (currentPage === "connections") {
      return <ConnectionSetting />;
    } else if (currentPage === "company") {
      return <CompanySetting/>;
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

        <StyledButton
          currentPage={currentPage}
          page="company"
          onClick={() => setCurrentPage("company")}
        >
          Company
        </StyledButton>

        <StyledButton
          currentPage={currentPage}
          page="AccountBilling & Plans"
          onClick={() => setCurrentPage("AccountBilling & Plans")}
        >
          {" "}
          AccountBilling & Plans
        </StyledButton>

        <StyledButton
          currentPage={currentPage}
          page="Notifications"
          onClick={() => setCurrentPage("Notifications")}
        >
          {" "}
          <IoMdNotificationsOutline />
          Notifications
        </StyledButton>

        <StyledButton
          currentPage={currentPage}
          page="connections"
          onClick={() => setCurrentPage("connections")}
        >
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
