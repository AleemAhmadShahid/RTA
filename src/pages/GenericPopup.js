// GenericPopup.js
import React, { useState } from "react";
import { CloseButton } from "./styles/MultiStepFormStyling";
import styled from "styled-components";
// import { AddButton } from "../components/AddTask";
import { AddButton } from "./CardsPopup";
// import { H6 } from "./styles/MultiStepFormStyling";
const Box = styled.div`
  z-index: 20;
  position: absolute;
  background: white;
  width: 300px;
  border-radius: 5px;
  height: auto;
  padding:10px;
  border:0.2px solid #f5f5f5;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* other styles */
`;
const Input = styled.input`
  width: 100%;
  padding: 5px;
  border-radius: 3px;
  margin-bottom:20px;
  font-size: 12px;
  box-shadow: inset 0 0 0 2px var(--ds-border-input,#091e4224);
   line-height: 22px; 
   border:2px solid ;
   &:focus {
    border-color: skyblue; 
    outline: none;
    
  }
`;
const HeadingContainer=styled.div`
position:relative;
//  justify-content:center;
justify-content: space-between;
display:flex;

`
const H6 = styled.h6`
  flex: 2; /* Adjust the flex value as needed */
  text-align: center; /* Center the heading text */
  margin-top:5px;
`;
const CloseButtonContainer = styled.div`
  margin-left: auto; /* Push the close button to the right */
`;

const GenericPopup = ({
  fields,
  onClose,
  onSubmit,
  buttonText,
  onCloseButtonClick,
  left, 
  top,
  heading,
}) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (fieldName, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formValues);
    onClose();
  };

  return (
    <Box left={left} top={top}> 
    
      {fields.map((field) => (
      
        <div key={field.name}>
            <HeadingContainer>
            <H6 styles={{flex:2}} >{field.name}</H6>
            <CloseButtonContainer>
              <CloseButton onClick={onCloseButtonClick || onClose} >&#10005;</CloseButton>
            </CloseButtonContainer>
            </HeadingContainer>
          <Input 
            type={field.type}
            value={formValues[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
          />
        </div>
      ))}
      <AddButton  style={{
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    // Other button styles
  }} onClick={handleSubmit}>{buttonText || 'Submit'}</AddButton> 
      {/* <AddButton onClick={onCloseButtonClick || onClose}>Close</AddButton> */}
    </Box>
  );
};

export default GenericPopup;
