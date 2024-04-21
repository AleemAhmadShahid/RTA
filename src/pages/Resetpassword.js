import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import styled from "styled-components";
import { FormLabel } from "./styles/MultiStepFormStyling";
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import { useParams } from 'react-router-dom';
import { createPostRequest } from "../global/requests";
import { Container,RTAHeader,LeftPanel,Image,RightPanel,Title,ButtonContainer,SendButton,CancelButton,Box,H6 } from "./ForgetPassword";
import { useDispatch } from 'react-redux';
import { setSuccessModal, setErrorModal } from '../redux/modalSlice';

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
width: 100%;
padding: 7px;
margin-bottom: 10px;
border: 1px solid #ccc;
border-radius: 5px;
`;

const PasswordToggle = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

const ResetPassword = ({name, description}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const sendResetRequest = async () =>
  {
    const response = await createPostRequest({password},`/api/user/${id}/setupPassword`);
    if (response.status !== 200)
      dispatch(setErrorModal({message: response.error}));
    else
      dispatch(setSuccessModal({message: response.message}));
  }


  return (
    <Container>
      <RTAHeader>RTA</RTAHeader>
      <LeftPanel>
        <Image src="/Forgetpass.jpg" alt="Forget Password" />
      </LeftPanel>
      <RightPanel>
        <Box>
          <Title>{name}🔒</Title>
          <H6>{description}</H6>
          <InputContainer>
            <FormLabel style={{ fontWeight: "lighter" }}>New Password</FormLabel>
            <div style={{ position: "relative" }}>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                onChange={(e)=>setPassword(e.target.value)}
              />
              <PasswordToggle onClick={togglePasswordVisibility}>
                {showPassword ? <FiEye />:<FiEyeOff />} {/* Use React Icons here */}
              </PasswordToggle>
            </div>
          </InputContainer>
          <InputContainer>
            <FormLabel style={{ fontWeight: "lighter" }}>Confirm Password</FormLabel>
            <div style={{ position: "relative" }}>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <PasswordToggle onClick={togglePasswordVisibility}>
                {showPassword ?  <FiEye />:<FiEyeOff /> } {/* Use React Icons here */}
              </PasswordToggle>
            </div>
          </InputContainer>
          <ButtonContainer>
            <SendButton onClick={sendResetRequest}>Set New Password</SendButton>
            <CancelButton onClick={() => navigate('/login')}>&lt; Back to Login</CancelButton>
          </ButtonContainer>
        </Box>
      </RightPanel>
    </Container>
  );
};

export default ResetPassword;
