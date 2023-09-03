import React from "react";
import styled from "styled-components";

const LoginPageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ImageContainer = styled.div`
  flex: 1;
  background: url(${require("./Pngtree.jpg")});
  background-size: cover;
`;

const LoginFormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

const LoginForm = styled.form`
  width: 90%;
  max-width: 400px;
  padding: 19px;
  background: #ffffff;
  border-radius: 0px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 9px;
`;

const LoginButton = styled.button`
  background: #ffa500;
  color: #ffffff;
  border: none;
  border-radius: 9px;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ffd000;
  }
`;

const StyledH3 = styled.h3`
  font-weight: bold;
  margin-top: 34px;
`;
const StyledH4 = styled.h4`
  font-weight: bold;
  color: #ffa500;
  margin-bottom: 10px;
`;

const GoogleLoginButton = styled.a`
  margin-top: 34px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  padding: 10px 15px;
  width: 50%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  color: #333;
`;

const GoogleIcon = styled.img`
  width: 20px;
  height: 20px;
  // margin-right: 10px;
`;
const StyledH6 = styled.h6`
  font-weight: 300; /* Thin font weight */
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const RememberMeLabel = styled.label`
  font-size: 14px;

  margin-right: 5px;
  color: #333;
  margin-bottom: 16px;
  margin-top: -6px;
  margin-right: 130px;
`;

const RememberMeInput = styled.input`
  vertical-align: middle;
  margin-right: 7px;
  // justify-content: space-between;
`;
const ForgotPasswordButton = styled.button`
  background-color: white; /* Change the background color to white */
  color: blue; /* Change the font color to blue */
  font-weight: 100;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  // padding: 8px 16px;
  cursor: pointer;
  
  transition: background-color 0.3s ease;

  &:hover {
    background-color: white; /* Change the color on hover */
  }
`;
const CreateAccountButton = styled.button`
  background: transparent;
  border: none;
  color: #ffa500;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
`;

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <ImageContainer />
      <LoginFormContainer>
        <LoginForm>
          <StyledH4>RTA</StyledH4>
          <StyledH3>Log in to your Account </StyledH3>
          <h6> Welcome! Select a method to Log in</h6>
          <GoogleLoginButton>
            <GoogleIcon src="./googlelogo.png" alt="Google" />
            Google
          </GoogleLoginButton>
          <StyledH6>--or continue with an email--</StyledH6>
          <InputField type="text" placeholder="Email" />
          <InputField type="password" placeholder="Password" />
          <RememberMeLabel>
            <RememberMeInput type="checkbox" />
            Remember me
          </RememberMeLabel>
          <ForgotPasswordButton>Forgot Password?</ForgotPasswordButton>
          <LoginButton>Log in</LoginButton>
          {/* <StyledH6>--Don't have an account?-- */}
          {/* <CreateAccountButton >create an Account</CreateAccountButton></StyledH6> */}
        </LoginForm>
      </LoginFormContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;
