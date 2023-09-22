import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FormStep,
  FormGroup,
  FormInput,
  FormButton,
} from './multistepformstyling';

const H6 = styled.h6`
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: lighter;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 300px; /* Set a max height for scrollability */
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const FormLabel = styled.label`
  display: block;
  margin-bottom: 1px;
  font-size: 14px;
`;

const CostContainer = styled.div`
  display: flex;
  align-items: center;
 
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

const AddItemButton = styled(FormButton)`
  align-self: flex-end;
`;

const StepThree = ({ formData, handleChange }) => {
  const [items, setItems] = useState([]); // State to store the items

  const addItem = () => {
    // Add a new item to the items array with default values
    setItems([...items, { address1: '', cost: 0 }]);
  };

  const removeItem = (index) => {
    // Remove the item at the specified index
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <FormStep active>
      <H6>Fill in the details so that we can get in contact with you</H6>
      <Container>
        <BoxTitle>Meeting Packages</BoxTitle>
        <BoxContainer>
          {items.map((item, index) => (
            <BorderBox key={index}>
              <CloseButton onClick={() => removeItem(index)}>×</CloseButton>
              <div>
                <FormLabel>item</FormLabel>
                <FormInput
                  type="text"
                  value={item.address1 || ''}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].address1 = e.target.value;
                    setItems(newItems);
                  }}
                />
              </div>
              <div>
                <FormLabel>Cost</FormLabel>
                <CostContainer>
                  <CostButton
                    onClick={() => {
                      const newItems = [...items];
                      newItems[index].cost = Math.max(0, item.cost - 1);
                      setItems(newItems);
                    }}
                  >
                    -
                  </CostButton>
                  <CostValue>{item.cost}</CostValue>
                  <CostButton
                    onClick={() => {
                      const newItems = [...items];
                      newItems[index].cost = item.cost + 1;
                      setItems(newItems);
                    }}
                  >
                    +
                  </CostButton>
                </CostContainer>
              </div>
            </BorderBox>
          ))}
        </BoxContainer>
        <AddItemButton onClick={addItem}>Add Item</AddItemButton>
      </Container>
    </FormStep>
  );
};

export default StepThree;
