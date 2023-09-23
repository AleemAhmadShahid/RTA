import React from "react";
import styled from "styled-components";
import { FormLabel } from "./Employees/MultiStepFormStyling";

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



const EmailInput = styled.input`
  width: 100%;
  padding: 7px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

const ForgotPassword = () => {
  return (
    <Container>
      <RTAHeader>RTA</RTAHeader>
      <LeftPanel>
        <Image src="/Forgetpass.jpg" alt="Forget Password" />
      </LeftPanel>
      <RightPanel>
        <Box>
          <Title>Forgot Password?🔒</Title>
          <H6>
            Enter your email, and we'll send you instructions to reset your
            password.
          </H6>
          <FormLabel style={{ fontWeight: "lighter" }}>Email</FormLabel>

          <EmailInput type="email" placeholder="Enter your email" />
          <ButtonContainer>
            <SendButton>Send Reset Link</SendButton>
            <CancelButton>&lt; Back to Login</CancelButton>
          </ButtonContainer>
        </Box>
      </RightPanel>
    </Container>
  );
};

export default ForgotPassword;
