import React, { useState } from "react";
import styled from "styled-components";
import { FormLabel } from "./Employees/MultiStepFormStyling";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import the eye icons from react-icons

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const RTAHeader = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #ffa500;
`;

const LeftPanel = styled.div`
  flex: 2;
  height: 100%;
  background: #ffff;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const RightPanel = styled.div`
  flex: 1;
  padding: 10px;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
`;


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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SendButton = styled.button`
  background-color: #ffa500;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 7px;
  margin-bottom: 10px;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease;

  &:hover {
    background: #ffd000;
  }
`;

const CancelButton = styled.button`
  background-color: #ededed;
  color: #ffa500;
  border: none;
  border-radius: 5px;
  padding: 7px;
  cursor: pointer;
  width: 100%;
`;

const Box = styled.div`
  padding: 40px;
  text-align: left;
`;

const H6 = styled.h6`
  font-size: 14px;
  margin-bottom: 20px;
`;

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <RTAHeader>RTA</RTAHeader>
      <LeftPanel>
        <Image src="/Forgetpass.jpg" alt="Forget Password" />
      </LeftPanel>
      <RightPanel>
        <Box>
          <Title>Reset Password?🔒</Title>
          <H6>Your new password must be different from previously used passwords</H6>
          <InputContainer>
            <FormLabel style={{ fontWeight: "lighter" }}>New Password</FormLabel>
            <div style={{ position: "relative" }}>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
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
            <SendButton>Set New Password</SendButton>
            <CancelButton>&lt; Back to Login</CancelButton>
          </ButtonContainer>
        </Box>
      </RightPanel>
    </Container>
  );
};

export default ResetPassword;
