import React,{ useState } from "react";
import { useNavigate  } from "react-router-dom";
import styled from "styled-components";
import {createPostRequest} from '../global/helper'

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
  console.log("Backend URL",process.env.BACKEND_URL);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter')
      handleSubmit(event);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
   
    
    try {
      const response  = await createPostRequest(formData);
      if (response.status === 401) 
        setError(response.error);
      else if (response.status === 200) {
        document.cookie = 'token='+response.token;
        navigate("/portal/iam/");
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


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
            <InputField
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          {error && <StyledH6> {error} </StyledH6>}
        <RememberMeLabel>
            <RememberMeInput type="checkbox" />
            Remember me
          </RememberMeLabel>
          <ForgotPasswordButton>Forgot Password?</ForgotPasswordButton>
          <LoginButton onClick={handleSubmit}>Log in</LoginButton>
          {/* <StyledH6>--Don't have an account?-- */}
          {/* <CreateAccountButton >create an Account</CreateAccountButton></StyledH6> */}
        </LoginForm>
      </LoginFormContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;
