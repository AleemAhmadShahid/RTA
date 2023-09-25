import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  
} from "../styles/MultiStepFormStyling";
import {
  EntriesDropdown,
  dropDownStyle
  } from "../styles/TableStyling";
import { createGetRequest } from "../../global/helper";

const StepTwo = ({ formData, handleChange }) => {
  const [role, setRoles] = useState([{}]);
  const [selectedRole, setSelectedRole] = useState({label: "Select", "value": {}});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/role");
        if (data.status == 200)
        {
          const roles = data.roles.map((role) => ({ label: role.name, value: role._id }));
          setRoles(roles);
          if(formData?.roles?.[0])
          {
            const findSelectedRole = data.roles.find((roleObj)=> formData.roles[0] == roleObj._id);
            setSelectedRole({ label: findSelectedRole.name, value: findSelectedRole._id });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

  },[]);
  return (
    <FormStep active>
      <div style={{ flex: 1 }}>
        <FormGroup>
          <h6>Employee Information</h6>
          <FormLabel>Date of Joining</FormLabel>
          <FormInput
            type="date"
            value={formData.dateOfJoining && formData.dateOfJoining.split('T')[0] || ""}
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
    </FormStep>
  );
};

export default StepTwo;
