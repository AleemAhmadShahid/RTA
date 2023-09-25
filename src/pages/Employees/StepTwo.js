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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/role");
        if (data.status == 200)
        {
          const roles = data.roles.map((role) => ({ label: role.name, value: role._id }));
          setRoles(roles);
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
          <h6>Fill in the details so that we can get in touch with you</h6>
          <FormLabel>Date of Joining</FormLabel>
          <FormInput
            type="date"
            value={formData.dateOfJoining || ""}
            onChange={(e) => handleChange("dateOfJoining", e.target.value)}
          />
        </FormGroup>
      </div>

      <FormGroup>
        <FormLabel>Role</FormLabel>
        <FormInput
          type="text"
          value={formData.phoneNumber || ""}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />
      </FormGroup>
    </FormStep>
  );
};

export default StepTwo;
