import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Switch from "../../components/Switch";
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
} from "../../styles/TableStyling";
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
} from "../../styles/MultiStepFormStyling";

import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt, BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { setUser as setGlobalUser} from '../../redux/userSlice';
import {  validateAlphabeticWithSpace } from "../../global/validators";
import { StyledErrorH6 } from "../Login";
import {createPutRequest} from '../../global/requests'
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

} from '../EmpSetting'

import {DashBoardCompBox,  Surveydata} from "../IAM/EmpDashBoard/EmpDashBoard"

import SurveyBarChart from "../../components/SurveyBarChart";
import StarRating from "../../components/StarRating";

import {EntriesDropdown} from "../../styles/TableStyling"
import SurveysCom from "../../components/FormBuilderHelper"
 
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



const Respondents = () => {
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
      <br></br>
      <EntriesDropdown
        width={"100%"}
        options={[1,2,3].map((option) => ({
          value: option,
          label: option.toString(),
        }))}
      />
    </>
  );
};


const Analysis = () => {
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
    <br></br>
    <DashBoardCompBox style={{ width: "100%", padding: "20px" }}>
        <ColumnContainer>
          <LeftColumn>
            <h6>1.How would you rate the overall quality of the porduct</h6>
            <StarRating readOnly />
          </LeftColumn>
          <RightColumn>
            <SurveyBarChart data={Surveydata} />
          </RightColumn>
        </ColumnContainer>
    </DashBoardCompBox>
   
    </>
  );
};



const FormResponseView = () => {
  const [currentPage, setCurrentPage] = useState("respondents");

  const renderContent = () => {
    if (currentPage === "respondents") {
      return (
        <>
          <Respondents />
        </>
      );
    } else if (currentPage === "analysis") {
      return (
        <>
          <Analysis />
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
          page="respondents"
          onClick={() => setCurrentPage("respondents")}
        >
          <AiOutlineUser />
          Respondents
        </StyledButton>

        <StyledButton
          currentPage={currentPage}
          page="analysis"
          onClick={() => setCurrentPage("analysis")}
        >
          <BiLockAlt /> 
          Analysis
        </StyledButton>

     
      </ButtonContainer>

      {/* <BoxContainer>   */}
      {renderContent()}
      {/* </BoxContainer> */}
    </CenteredContainer>
  );
};

export default FormResponseView;
