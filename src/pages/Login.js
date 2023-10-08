import React,{ useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import styled from "styled-components";
import {createPostRequest} from '../global/helper'
import ErrorDialog from "../components/ErrorDialog";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';


const LoginPageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ImageContainer = styled.div`
  flex: 1;
  background: url("/Login.jpg"); /* Reference the image using its path in the public folder */
  background-size: cover;
   @media (max-width: 768px) { 
    display: none;
  }
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

export const StyledErrorH6 = styled.h6`
  font-weight: 300;
  font-size: 14px;
  text-align: left;
  color: red;
  margin-bottom: 10px;
  margin-top: -5px;
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
  const path = '/api/user/login';
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
 

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [blankEmailError, setBlankEmailError] = useState('');
  const [blankPasswordError, setBlankPasswordError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter')
      handleSubmit(event);
  };

  const handleInputChange = (e) => {
    if (e.target.name == "email")
    {
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (e.target.value == "")
        setBlankEmailError("");
      else if(!emailPattern.test(e.target.value))
        setBlankEmailError("Invalid email");
      else
        setBlankEmailError("");
    }
    else
      setBlankPasswordError("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    document.cookie = `token=${''}; expires=${new Date(Date.now() - 59 * 60000).toUTCString()}; path=/;`;
        

    if (formData.email == "")
      setBlankEmailError("Email cannot be blank");
    if (formData.password == "")
      setBlankPasswordError("Password cannot be blank");
    if(formData.email == "" || formData.password == "")
      return;
    try {
      const response  = await createPostRequest(formData, path);
      if (response.status === 401) 
      {
        setErrorMessage(response.error);
        setIsDialogOpen(true);
      }
      else if (response.status === 200) {
        localStorage.setItem('token', response.token);
        dispatch(setUser(response.user));
        navigate("/portal/iam/employee");
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if(user.isAuthenticated)
      navigate("/portal/iam/employee");
    
  }, []);



  return (
    <LoginPageContainer>
      <ImageContainer />
      <LoginFormContainer>
      <ErrorDialog message={errorMessage} show={isDialogOpen} handleClose={handleCloseDialog} />{" "}
      
        <LoginForm>
          <StyledH4>RTA</StyledH4>
          <StyledH3>Log in to your Account </StyledH3>
          <h6> Welcome!</h6>
          <br/>
          {/* <GoogleLoginButton>
            <GoogleIcon src="./googlelogo.png" alt="Google" />
            Google
          </GoogleLoginButton>
          <StyledH6>--or continue with an email--</StyledH6> */}
            <InputField
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          {blankEmailError && <StyledErrorH6> {blankEmailError} </StyledErrorH6>}
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          {blankPasswordError && <StyledErrorH6> {blankPasswordError} </StyledErrorH6>}
        <RememberMeLabel>
            <RememberMeInput type="checkbox" />
            Remember me
          </RememberMeLabel>
          <ForgotPasswordButton onClick={() => navigate("/forget-password")}>Forgot Password?</ForgotPasswordButton>
          <LoginButton onClick={handleSubmit}>Log in</LoginButton>
          {/* <StyledH6>--Don't have an account?-- */}
          {/* <CreateAccountButton >create an Account</CreateAccountButton></StyledH6> */}
        </LoginForm>
      </LoginFormContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;
