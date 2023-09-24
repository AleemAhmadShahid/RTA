import styled from 'styled-components';

export const StepNumberContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NumberCircle = styled.div`
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
export const ModalOverlay = styled.div`
 
  
   flex-direction: column; /* To stack child components vertically */
   position: fixed;
  top: 0;
  left: 0;
  
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  z-index: 15;
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  // padding: 0px 0px;
  border-radius: 0px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: 100%;
  @media screen and (max-width: 845px) {
    width: 100%; /* Set width to 100% for mobile view */
    border-radius: 0; /* Remove border radius for mobile view */
  }

`;

export const InnermodalContainer = styled.div`
  background-color: #fff;
  padding: 17px 30px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  // justify-content:center;
  top: 0; 
  right: 0; 
  // height: 100%;
  @media screen and (max-width: 845px) {
    width: 100%; /* Set width to 100% for mobile view */
  }
`;


export const FormStep = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size:small;
  
`;

export const FormInput = styled.input`

  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  
`;

export const FormHalfInput = styled.input`
   flex: 1; /* Make the input fields flexible to cover available space */
  padding: 5px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;


export const FormButton = styled.button`
  background-color: #ffa500;
  color: #fff;
  border: none;
  border-radius: 10px;
  margin-top:5px;
  padding: 10px 20px; 
  font-size: small;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8000;
  }
`;
export const FormRadioGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormRadioLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const FormRadioInput = styled.input`
  margin-right: 5px;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 9px;
`;
export const BottomButtonsContainer = styled.div`
  position: fixed;
  bottom: 0;
  
   right: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px; /* Add padding to create space around the buttons */
  // background-color: white;
 
`;
export const H6 = styled.h6`
  margin-top: 10px; /* Add top margin */
  margin-bottom: 20px;
  word-wrap: break-word;
`;
export const CloseButton = styled.button`
  padding: 7px 7px;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  margin-buttom: 1px;
  margin-right: 0px;
`;
export const PictureUploadButton = styled.label`
  background-color: #ffa500;
  color: #fff;
  padding: 3px 12px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;
  margin-right: 20px;

  input[type='file'] {
    display: none;
  }

  &:hover {
    background-color: #ff8000;
  }
`;
export const UploadBox = styled.div`
  background-color: #ededed;
  padding: 5px;
  border: 1px solid #ededed;
  border-radius: 5px;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  overflow: hidden;
`;


export const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 20px; /* Add margin to separate button and box */
`;
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: flex-start;/* Center horizontally */
`;
export const P=styled.p`
font-size:15px;
margin-left:10px;
`;
export const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const SaveButton = styled(FormButton)`
  background-color: white;
  color: black;
`;

export const SaveAndNextButton = styled(FormButton)`
  background-color: #ffa500;
  color: white;
  
`;

export const FormButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const PreviousButton = styled(FormButton)`
  background-color: white;
  color: black;
`;

export const StepIndicators = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

export const StepIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
 
`;

export const StepIndicator = styled.div`
  width: 39px;
  height: 39px;
  border: 3px solid ${(props) => (props.active ? "#ffa500" : "#ccc")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
  margin-bottom: 10px;
  color: #000; /* Set the number color to black */
  
`;

export const Line = styled.div`
  width: 90px;
  height: 2px;
  background: #ccc;
  margin-right: 10px;
  margin-top: -10px;
  @media screen and (max-width: 845px) {
    width: 70px; /* Set width to 100% for mobile view */
  }
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid #f5f5f5;
  background: #f5f5f5;
  border-top-left-radius: 5px; /* Adjust the value as needed */
  border-top-right-radius: 5px;
  padding: 5px 10px;
  @media screen and (max-width: 845px) {
    width: 100%; /* Set width to 100% for mobile view */
  }
`;
export const Heading = styled.h5`
  margin: 0;
`;

export const FormCenteringContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  @media screen and (max-width: 845px) {
    width: 100%; /* Set width to 100% for mobile view */
    overflow-y: auto;
  }
`;
export const Step3AddButton = styled(FormButton)`
  align-self: flex-end;
`;
export const Step3Container = styled.div`
  display: flex;
  flex-direction: column;
  align-qualification: flex-start;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 380px; /* Set a max height for scrollability */
`;

export const BoxStep3Container = styled.div`
  display: flex;
  flex-direction: column;
  align-qualification: flex-start;
  width: 100%;
`;

export const Step3BorderBox = styled.div`
  border: 1px solid #ededed;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  position: relative;
`;

export const Step3CloseButton = styled.button`
  background: none;
  border: none;
  color: #ff0000;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 5px;
`;



