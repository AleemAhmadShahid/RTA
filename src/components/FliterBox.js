import React from "react";
import styled from "styled-components";
import Select from "react-select";

const FilterBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0px;
  margin-bottom:5px;
`;

const Dropdown = styled(Select)`
  width: 350px;
  
  margin-right: 10px;

  .select__control {
    border: 1px solid orange;
    border-radius: 5px;
    padding: 1px;
    transition: border-color 0.3s ease;
    font-size: 12px;

    &:hover {
      border-color: orange;
    }

    &:focus {
      outline: none;
      border-color: orange;
      box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.5);
    }
  }
`;

const Box = styled.div`
  
//  display: inline-block; /* Change display property to inline-block */
//   margin-right: 10px;
//   border: 1px solid #fff;
//   background: #fff;
//   width: auto; /* Change width to auto */
  
`;
const Title = styled.h6`
  font-size: 13px; /* Adjust the font size as needed */
  margin-bottom:3px;
  margin-left:3px;
`;


const FilterBox = ({ options, title, selectedValue, onValueChange }) => {
  const handleDropdownChange = (selectedOption) => {
    onValueChange(selectedOption.value);
  };

  return (

    <Box>
      <Title>{title}</Title>
      <FilterBoxContainer>
        <Dropdown
          value={{
            value: selectedValue,
            label: selectedValue.toString(),
          }}
          onChange={(selectedOption) =>
            handleDropdownChange(selectedOption)
          }
          options={options.map((option) => ({
            value: option,
            label: option.toString(),
          }))}
          styles={{
            menu: (provided) => ({
              ...provided,
              background: "#ffffff", // Background color when the dropdown is open
              border: provided.isFocused
                ? "1px solid orange"
                : "1px solid #ccc",
                fontSize: "13px",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? "white" : "white", // Background color when an option is selected
              color: state.isSelected ? "black" : "black", // Text color when an option is selected
              "&:hover": {
                backgroundColor: "#ffa500", // Background color when hovering over an option
                color: "white", // Text color when hovering over an option
              },
              display: "flex",
              justifyContent: "space-between", // Add space between label and checkbox
              alignItems: "center", // Vertically center the label and checkbox
              fontSize: "12px",
            }),
          }}
        />
      </FilterBoxContainer>
    </Box>
    
  );
};

export default FilterBox;
