import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FormStep,
  FormGroup,
  FormInput,
  FormButton,
  FormLabel
} from './MultiStepFormStyling';

const H6 = styled.h6`
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: lighter;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-qualification: flex-start;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 380px; /* Set a max height for scrollability */
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-qualification: flex-start;
  width: 100%;
`;

const BorderBox = styled.div`
  border: 1px solid #ededed;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ff0000;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 5px;
`;

const BoxTitle = styled.div`
  font-size: 17px;
  margin-bottom: 5px;
`;

const CostContainer = styled.div`
  display: flex;
  align-qualification: center;
 
`;

const CostButton = styled.button`
  background-color: #ededed;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
`;

const CostValue = styled.span`
  font-size: 16px;
  margin: 0 10px;
`;

const AddButton = styled(FormButton)`
  align-self: flex-end;
`;

const StepThree = ({ formData, handleChange }) => {
  const [qualification, setQualifications] = useState([]); // State to store the qualification
  const [experience, setExperience] = useState([]); // State to store the qualification

  const addItem = (setFunction, state) => {
    // Add a new item to the qualification array with default values
    setFunction([...state, { address1: '', cost: 0 }]);
  };

  const removeItem = (index, setFunction,state) => {
    // Remove the item at the specified index
    const newState = [...state];
    newState.splice(index, 1);
    setFunction(newState);
  };

  return (
    <FormStep active>
      <H6>Fill in the details so that we can get in contact with you</H6>
      <Container>
        <FormLabel>Qualification</FormLabel>
        <BoxContainer>
          {qualification.map((item, index) => (
            <BorderBox key={index}>
              <CloseButton onClick={() => removeItem(index, setQualifications, qualification)}>×</CloseButton>
              <div>
                <FormLabel>Level</FormLabel>
                <FormInput
                  type="text"
                  value={item.address1 || ''}
                  onChange={(e) => {
                    const newQualifications = [...qualification];
                    newQualifications[index].address1 = e.target.value;
                    setQualifications(newQualifications);
                  }}
                />
              </div>
              <div>
                <FormLabel>Degree</FormLabel>
                <FormInput
                  type="text"
                  value={item.address1 || ''}
                  onChange={(e) => {
                    const newQualifications = [...qualification];
                    newQualifications[index].address1 = e.target.value;
                    setQualifications(newQualifications);
                  }}
                />
              </div>
              <div>
                <FormLabel>Instituion</FormLabel>
                <FormInput
                  type="text"
                  value={item.address1 || ''}
                  onChange={(e) => {
                    const newQualifications = [...qualification];
                    newQualifications[index].address1 = e.target.value;
                    setQualifications(newQualifications);
                  }}
                />
              </div>

              <div>
                <FormLabel>Year</FormLabel>
                <FormInput
                  type="Number"
                  value={item.address1 || ''}
                  onChange={(e) => {
                    const newQualifications = [...qualification];
                    newQualifications[index].address1 = e.target.value;
                    setQualifications(newQualifications);
                  }}
                />
              </div>
              
            </BorderBox>
          ))}
        </BoxContainer>
        <AddButton onClick={() => addItem(setQualifications, qualification)}>Add Qualification</AddButton>
      </Container>
      <Container>
        <FormLabel>Experience</FormLabel>
        <BoxContainer>
          {experience.map((item, index) => (
            <BorderBox key={index}>
              <CloseButton onClick={() => removeItem(index, setExperience, experience)}>×</CloseButton>
              <div>
                <FormLabel>Company</FormLabel>
                <FormInput
                  type="text"
                  value={item.address1 || ''}
                  onChange={(e) => {
                    const newQualifications = [...qualification];
                    newQualifications[index].address1 = e.target.value;
                    setQualifications(newQualifications);
                  }}
                />
              </div>
              <div>
                <FormLabel>Job Title</FormLabel>
                <FormInput
                  type="text"
                  value={item.address1 || ''}
                  onChange={(e) => {
                    const newQualifications = [...qualification];
                    newQualifications[index].address1 = e.target.value;
                    setQualifications(newQualifications);
                  }}
                />
              </div>
              <div>
                <FormLabel>Start Date</FormLabel>
                <FormInput
                  type="Date"
                  value={item.address1 || ''}
                  onChange={(e) => {
                    const newQualifications = [...qualification];
                    newQualifications[index].address1 = e.target.value;
                    setQualifications(newQualifications);
                  }}
                />
              </div>

              <div>
                <FormLabel>End Date</FormLabel>
                <FormInput
                  type="Date"
                  value={item.address1 || ''}
                  onChange={(e) => {
                    const newQualifications = [...qualification];
                    newQualifications[index].address1 = e.target.value;
                    setQualifications(newQualifications);
                  }}
                />
              </div>
              
            </BorderBox>
          ))}
        </BoxContainer>
        <AddButton onClick={() => addItem(setExperience, experience)}>Add Experience</AddButton>
      </Container>
    </FormStep>
  );
};

export default StepThree;
