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
} from "../styles/TableStyling";
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
} from "../styles/MultiStepFormStyling";

import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt, BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { setUser as setGlobalUser} from '../redux/userSlice';
import {  validateAlphabeticWithSpace } from "../global/validators";
import { StyledErrorH6 } from "./Login";
import {createPutRequest} from '../global/requests'
import {
  LeftColumn,
  RightColumn,
  ColumnContainer, 
  ColumnContainer1, 
  Box, 
  StyledButton, 
  ResetButton, 
  ButtonContainer, 
  H6,
  DeactivateButton,
  Warningbox,
  Image,
  APIbox,
  APIOptionsButton,
  CheckboxLabel,
  SwitchContainer,
  TimeInputContainer,
  TimeInput,
  Colon,
  InvisibleElement

} from './EmpSetting'



const handleChange = (
  formData,
  setFormData,
  field,
  value,
  errors,
  setErrors,
  setError = false
) => {
  let data = {...formData};

  const setField = (obj, keys, val) => {
    if (keys.length === 1) obj[keys[0]] = val;
    else {
      const [head, ...rest] = keys;
      if (!obj[head]) obj[head] = isNaN(parseInt(rest[0])) ? {} : [];
      obj[head] = {...obj[head]};
      obj[head] = setField(obj[head], rest, val);
    }
    return obj;
  };

  const fieldParts = field.split(".");
  data = setField(data, fieldParts, value);
  setFormData(data);
  if (typeof setError === "function" && value === "")
    setErrors(setField({ ...errors }, fieldParts, ""));
  else if (typeof setError == "function")
    setErrors(setField({ ...errors }, fieldParts, setError(value)));
};



const EmployeeManagementSetting = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const [user, setUser] = useState({...state});
  const [errors, setErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = async () =>
  {
    dispatch(setGlobalUser(user.user));
    const response  =  await createPutRequest(user.user,  `/api/user/${user.user._id}/`);
    setButtonDisabled(true);
  }

  return (
    <>
      <BoxContainer>
        <Box>
          <H6>Basic Details</H6>
          <hr />
          <ColumnContainer1>
            <SwitchContainer>
                   <span>Employee Code Prefix</span>
                   <TimeInput
                      type="text"
                      placeholder="EMP-"
                      width="150px"
                    />
            </SwitchContainer>
            <SwitchContainer>
                   <span>Reporting Manager</span>
                   <TimeInput
                      type="text"
                      placeholder="Lead"
                      width="150px"
                    />
            </SwitchContainer>
            <SwitchContainer>
                   <span>Performance Evaluation Period</span>
                   <TimeInput
                      type="text"
                      placeholder="Quaterly"
                      width="150px"
                    />
            </SwitchContainer>
            <SwitchContainer>
                   <span>Allow employees to view their evaluation</span>
                   <TimeInput
                      type="checkbox"
                      placeholder="EMP-"
                      width="150px"
                    />
            </SwitchContainer>
          </ColumnContainer1>

          <FormButton style={{ marginBottom: "10px", opacity: buttonDisabled ? 0.7 : 1  }} disabled={buttonDisabled} onClick={handleSubmit}>Save changes</FormButton>
          <PreviousButton onClick={() => {setUser(state); setButtonDisabled(true);} }> Discard</PreviousButton>
        </Box>
      </BoxContainer>
      <BoxContainer>
        <Box>
          <H6>Allowance Setting</H6>
          <hr />
          <ColumnContainer1>
            <SwitchContainer>
                   <span>Employee Code Prefix</span>
                   <TimeInput
                      type="text"
                      placeholder="EMP-"
                      width="150px"
                    />
            </SwitchContainer>
          </ColumnContainer1>

          <FormButton style={{ marginBottom: "10px", opacity: buttonDisabled ? 0.7 : 1  }} disabled={buttonDisabled} onClick={handleSubmit}>Save changes</FormButton>
          <PreviousButton onClick={() => {setUser(state); setButtonDisabled(true);} }> Discard</PreviousButton>
        </Box>
     
      </BoxContainer>
    </>
  );
};


const AttedanceManagementSetting = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const [user, setUser] = useState({...state});
  const [errors, setErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = async () =>
  {
    dispatch(setGlobalUser(user.user));
    const response  =  await createPutRequest(user.user,  `/api/user/${user.user._id}/`);
    setButtonDisabled(true);
  }

  return (
    <>
      <BoxContainer>
        <Box>
          <H6>Basic Details</H6>
          <hr />
          <ColumnContainer1>
            <SwitchContainer>
                   <span>Late Arrival (in minutes)</span>
                   <TimeInput
                      type="number"
                      placeholder="10"
                      width="150px"
                    />
            </SwitchContainer>
            <SwitchContainer>
                   <span>Early Left (in minutes)</span>
                   <TimeInput
                      type="number"
                      placeholder="10"
                      width="150px"
                    />
            </SwitchContainer>
            <SwitchContainer>
                   <span>Allow CheckIn/Checkout through mobile</span>
                   <TimeInput
                      type="checkbox"
                      width="150px"
                    />
            </SwitchContainer>
            <SwitchContainer>
                   <span>Auto Approve Leaves</span>
                   <TimeInput
                      type="checkbox"
                      width="150px"
                    />
            </SwitchContainer>
            <SwitchContainer>
                   <span>Sandwich Leave</span>
                   <TimeInput
                      type="checkbox"
                      width="150px"
                    />
            </SwitchContainer>
          </ColumnContainer1>

          <FormButton style={{ marginBottom: "10px", opacity: buttonDisabled ? 0.7 : 1  }} disabled={buttonDisabled} onClick={handleSubmit}>Save changes</FormButton>
          <PreviousButton onClick={() => {setUser(state); setButtonDisabled(true);} }> Discard</PreviousButton>
        </Box>
      </BoxContainer>
   
    </>
  );
};



const CompanyPolicy = () => {
  const [currentPage, setCurrentPage] = useState("employeeManagement");

  const renderContent = () => {
    if (currentPage === "employeeManagement") {
      return (
        <>
          <EmployeeManagementSetting />
        </>
      );
    } else if (currentPage === "attendanceManagement") {
      return (
        <>
          <AttedanceManagementSetting />
        </>
      );
    }
  }

  return (
    <CenteredContainer>
      <Heading>Setup</Heading>
      <ButtonContainer>
        <StyledButton
          currentPage={currentPage}
          page="employeeManagement"
          onClick={() => setCurrentPage("employeeManagement")}
        >
          <AiOutlineUser />
          Employee Management
        </StyledButton>

        <StyledButton
          currentPage={currentPage}
          page="attendanceManagement"
          onClick={() => setCurrentPage("attendanceManagement")}
        >
          <BiLockAlt /> 
          Attendance Management
        </StyledButton>

     
      </ButtonContainer>

      {/* <BoxContainer>   */}
      {renderContent()}
      {/* </BoxContainer> */}
    </CenteredContainer>
  );
};

export default CompanyPolicy;
