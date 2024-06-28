import React, { useState, useEffect } from "react";

import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  Step3Container,
  BoxStep3Container,
  Step3BorderBox,
  Step3CloseButton,
  Step3AddButton, 
} from "../../../styles/MultiStepFormStyling";
import {
  EntriesDropdown,
  dropDownStyle
  } from "../../../styles/TableStyling";
import { createGetRequest } from "../../../global/requests";

const StepTwo = ({ formData, handleChange }) => {
  const [role, setRoles] = useState([{}]);
  const [allowanceSetting, setAllowanceSetting] = useState([]);
  
  
  const [allowances, setAllowances] = useState([]);
  const [selectedRole, setSelectedRole] = useState({label: "Select", "value": {}});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/role");
        if (data.status === 200)
        {
          const roles = data.roles.map((role) => ({ label: role.name, value: role._id }));
          setRoles(roles);
          if(formData?.roles?.[0])
          {
            const findSelectedRole = data.roles.find((roleObj)=> formData.roles[0] === roleObj._id);
            setSelectedRole({ label: findSelectedRole.name, value: findSelectedRole._id });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const data = await createGetRequest("/api/iam/settings/");
        if (data.status === 200)
        {
          setAllowanceSetting(data.allowances);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

  },[]);

  useEffect(() => {
    if (formData && (formData.allowances))
     setAllowances(formData.allowances);
  }, []);

  const addItem = (setFunction, state) => {
    setFunction([...state, state.length]);
  };

  
  const removeItem = (index, setFunction, state, key) => {
    const newState = [...state];
    newState.splice(index, 1);
    setFunction(newState);

    if (Array.isArray(formData[key])) {
      const newData = [...formData[key]];
      newData.splice(index, 1);
      handleChange(key, newData);
    }
  };

  return (
    <FormStep active>
      <div style={{ flex: 1 }}>
        <FormGroup>
          <h6>Employee Information</h6>
          <FormLabel>Date of Joining</FormLabel>
          <FormInput
            type="date"
            value={(formData.dateOfJoining && formData.dateOfJoining.split('T')[0]) || ""}
            onChange={(e) => handleChange("dateOfJoining", e.target.value)}
          />
        </FormGroup>
      </div>

      <FormGroup>
        <FormLabel>Role</FormLabel>
        <EntriesDropdown
            width="100%"
            value={selectedRole}
            onChange={(selectedOption) =>{
              setSelectedRole(selectedOption);
              handleChange("roles.0", selectedOption.value);
            }}
            options={role}
            styles={dropDownStyle}
          />
      </FormGroup>

      <FormGroup>
          <FormLabel>Employment Type</FormLabel>
          <EntriesDropdown
              width="100%"
            value={(formData?.employmentType
              && {label: formData?.employmentType, value: formData?.employmentType})
              || {label: "Select", value: "Select"}}
            onChange={(selectedOption) =>{
                handleChange(
                  `employmentType`,
                  selectedOption.value
                );
              }
            }
            options={['Full time', 'Part time', 'Temporary', 'Contract', 'Any', 'Permanent', 'Training', 'Volunteer', 'Seasonal', 'Freelance'].map((item) => ({label: item, value: item}))}
            styles={dropDownStyle}
          />
                
        </FormGroup>


      <FormGroup>
        <FormLabel>Base Salary</FormLabel>
        <FormInput
          type="number"
          value={formData.baseSalary || ""}
          placeholder={" Base Salary"}
          onChange={(e) => handleChange("baseSalary", e.target.value)}
          onBlur={(e) => handleChange("baseSalary", e.target.value)}
          required
        />
      </FormGroup>

      <FormLabel >Allowances</FormLabel>
      <Step3Container>
        <BoxStep3Container>
          {allowances.map((item, index) => (
            <Step3BorderBox key={index}>
              <Step3CloseButton
                onClick={() =>
                  removeItem(
                    index,
                    setAllowances,
                    allowances,
                    "allowances"
                  )
                }
              >
                ×
              </Step3CloseButton>

              <FormGroup>
                <FormLabel>Allowance Type</FormLabel>
                  <EntriesDropdown
                    width="100%"
                  value={allowanceSetting.filter((item => item._id == formData?.allowances?.[index]?.allowanceType)).map((item) => ({label: item.name, value: item._id}))[0]}
                  onChange={(selectedOption) =>{
                      handleChange(
                        `allowances.${index}.level`,
                        selectedOption.value
                      );
                    }
                  }
                  options={allowanceSetting.map((item)=>  ({label: item.name, value: item._id}))}
                  styles={dropDownStyle}
                />
                
                </FormGroup>

                <FormGroup>
                <FormLabel>Amount</FormLabel>
                <FormInput
                  type="Number"
                  value={formData?.allowances?.[index]?.amount || ""}
                  onChange={(e) =>
                    handleChange(
                      `allowances.${index}.amount`,
                      e.target.value
                    )
                  }
                />
              </FormGroup>         
            </Step3BorderBox>
          ))}
        </BoxStep3Container>
        <Step3AddButton
          onClick={() => addItem(setAllowances, allowances)}
        >
          Add Allowance
        </Step3AddButton>
      </Step3Container>
            
    </FormStep>
  );
};

export default StepTwo;
