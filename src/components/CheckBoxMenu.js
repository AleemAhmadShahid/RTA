import React, { useState } from "react";
import Select from "react-select";




const CheckOptions = ["Option 1", "Option 2", "Option 3"];

const EntriesDropdown = ({ value, onChange, options, styles }) => {
  const [selectedCheck, setSelectedCheck] = useState(value);

  const handleCheckChange = (option) => {
    setSelectedCheck(option);
    onChange(option);
  };

  return (
    <Select
      value={options.find((option) => option.value === selectedCheck)}
      onChange={(selectedOption) => handleCheckChange(selectedOption.value)}
      options={options}
      styles={{
        menu: (provided) => ({
          ...provided,
          background: "#ffffff",
          border: provided.isFocused ? "1px solid orange" : "1px solid #ccc",
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
        }),
        ...styles, // Merge with the custom styles you already have
      }}
    />
  );
};

export default EntriesDropdown;
