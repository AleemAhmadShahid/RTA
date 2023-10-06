import React from 'react';
import styled from 'styled-components';
import { Container } from './ForgetPassword';

const TopRightText = styled.div`
  position: absolute;
  top: 25px;
  left: 15px;
  color: orange;
  font-size: 24px;
`;

const CenterContent = styled.div`
  text-align: center;
`;

const Text = styled.div`
  font-size: 24px;
`;

const SubText = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 5px 20px;
  background-color: #ffa500;
  color: #fff;
  border: none;
  cursor: pointer;

  border-radius:5px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Image = styled.img`
  margin-top: 20px;
  width: 700px; /* Adjust the width as per your requirement */
  height: auto; /* Maintain the aspect ratio */
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NotFoundPage = ({message, description}) => {
  return (
    <Container>
      <TopRightText>RTA</TopRightText>
      <CenterContent>
        <Text>{message} 🕵️‍♀️</Text>
        <SubText>{description}</SubText>
        <ContentWrapper>
          <Button>Back to home</Button>
          <Image src="/Notfound.png" alt="Image" />
        </ContentWrapper>
      </CenterContent>
    </Container>
  );
};

export default NotFoundPage;
