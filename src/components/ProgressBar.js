import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ProgressBarWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background-color: #eee;
  margin-bottom:10px;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${({ filled }) => filled}%;
  background-color: #a66cff;
  transition: width 1s;
`;

export const ProgressBarPercent = styled.span`
  font-weight: 600;
  
  position: relative;
 
  color: black;
  text-shadow: -1px 0 #555, 0 1px #555, 1px 0 #555, 0 -1px #555;
`;

const Button = styled.button`
  display: block;
  margin: 5rem auto;
  border: none;
  border-radius: 3px;
  outline: none;
  width: 100px;
  height: 40px;
  background-color: #937dc2;
  transition: box-shadow 0.5s;
  font-size: 16px;
  font-family: arial;
  color: #fff;
  cursor: pointer;
  &:hover {
    -webkit-box-shadow: inset 100px 0 0 0 #7c54d1;
    box-shadow: inset 100px 0 0 0 #7c54d1;
  }
`;

export default function Progressbar() {
  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  useEffect(() => {
    if (filled < 100 && isRunning) {
      setTimeout(() => setFilled(prev => prev += 2), 50);
    }
  }, [filled, isRunning]);

  return (
    <Container>
      <ProgressBarWrapper>
        <ProgressBarFill filled={filled} />
        <ProgressBarPercent>{filled}%</ProgressBarPercent>
      </ProgressBarWrapper>
      {/* <Button onClick={() => setIsRunning(true)}>Run</Button> */}
    </Container>
  );
}
