import React, { useState, useEffect } from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  H6,
} from "../../../styles/MultiStepFormStyling";
import { StyledErrorH6 } from "../../Login";
import Select from 'react-select';

import {
  createGetRequest,
} from "../../../global/requests";

const StepOne = ({employees, formData, errors, handleChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentEmployees = employees.map(item => item._id);
        const allUsers = await createGetRequest(`/api/user`, {});
        setOptions(
          allUsers.users
            .filter(item => !currentEmployees.includes(item._id)) 
            .map(item => ({ label: item.name, value: item._id }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
    fetchData();
  }, []);


  const handleChanger = (selected) => {
    setSelectedOptions(selected);
    handleChange("users", selected.map(item => item.value));
  };
 
  return (
    <FormStep active>

      <FormGroup>
        <FormLabel>Select Members</FormLabel>
        <Select
          isMulti 
          options={options}
          value={selectedOptions}
          onChange={handleChanger}
          styles={ {
            control: (base) => ({
              ...base,
              width: 300
            }),
            valueContainer: (base) => ({
              ...base,
              display: 'flex',
              flexWrap: 'wrap',
              overflow: 'hidden'
            }),
            multiValue: (base) => ({
              ...base,
              margin: '2px',
              display: 'flex'
            })
          }}
        />
      </FormGroup>
      {errors.users && <StyledErrorH6>{errors.users}</StyledErrorH6>}
      
    </FormStep>
  );
};

export default StepOne;
