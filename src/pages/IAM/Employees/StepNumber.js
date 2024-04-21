import React from "react";

import {
  StepNumberContainer,
  NumberCircle,
} from "../../styles/MultiStepFormStyling";

const StepNumber = ({ currentStep, totalSteps }) => {
  return (
    <StepNumberContainer>
      <NumberCircle>{currentStep}</NumberCircle>
      Step {currentStep} of {totalSteps}
    </StepNumberContainer>
  );
};

export default StepNumber;
