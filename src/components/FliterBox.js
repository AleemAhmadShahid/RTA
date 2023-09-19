import React from "react";
import styled from "styled-components";
import Select from "react-select";

const FilterBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 5px;
`;

const Dropdown = styled(Select)`
  width: ${(props) => props.width || "350px"};
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

  .select__menu {
    z-index: 9999; /* Adjust the z-index value as needed */
  }
`;

const Box = styled.div`
`;
const Title = styled.h6`
  font-size: 13px;
  margin-bottom: 3px;
  margin-left: 3px;
`;

const FilterBox = ({ options, title, selectedValue, onValueChange, width }) => {
  const handleDropdownChange = (selectedOption) => {
    onValueChange(selectedOption.value);
  };

  return (
    <Box>
      <Title>{title}</Title>
      <FilterBoxContainer>
        <Dropdown
          width={width}
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
              background: "#ffffff",
              border: provided.isFocused
                ? "1px solid orange"
                : "1px solid #ccc",
              fontSize: "13px",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? "white" : "white",
              color: state.isSelected ? "black" : "black",
              "&:hover": {
                backgroundColor: "#ffa500",
                color: "white",
              },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "12px",
            }),
          }}
        />
      </FilterBoxContainer>
    </Box>
  );
};

export default FilterBox;
