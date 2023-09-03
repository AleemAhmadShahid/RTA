import React from "react";
import styled from "styled-components";

const StepNumberContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NumberCircle = styled.div`
  width: 30px;
  height: 30px;
  background-color: #007bff;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px; /* Corrected property name */
  margin-right: 10px;
  animation: bounce 1s ease infinite;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;


const StepNumber = ({ currentStep, totalSteps }) => {
  return (
    <StepNumberContainer>
      <NumberCircle>{currentStep}</NumberCircle>
      Step {currentStep} of {totalSteps}
    </StepNumberContainer>
  );
};

export default StepNumber;
