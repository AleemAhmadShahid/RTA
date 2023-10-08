import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.pageloader ? '100vh' : 'auto')};
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffa500;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
`;

const Image = styled.img`
  max-width: 200px; /* Adjust the image size as needed */
`;

const LoaderComponent = ({ pageloader }) => {
  return (
    <LoaderContainer pageloader={pageloader}>
      {pageloader && <Image src="/RTA.png" alt="Image Alt Text" />}
      <Loader />
    </LoaderContainer>
  );
};

export default LoaderComponent;
