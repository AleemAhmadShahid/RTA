import React, { useState, useEffect } from "react";
import {
  FormStep,
  FormGroup,
  FormInput,
  FormLabel,
  H6,
} from "../../../styles/MultiStepFormStyling";
import {
  EntriesDropdown,
  dropDownStyle
  } from "../../../styles/TableStyling";
import Select from 'react-select';


const StepThree = ({ formData, handleChange }) => {
  const [role, setRoles] = useState([{}]);
  const [selectedRole, setSelectedRole] = useState({label: "Select", "value": {}});

  const [department, setDepartments] = useState([{}]);
  const [selectedDepartment, setSelectedDepartment] = useState({label: "Select", "value": {}});

  const [user, setUsers] = useState([{}]);
  const [selectedHiringManager, setSelectedHiringManager] = useState({label: "Select", "value": {}});
  const [selectedAssignedRecruiters, setSelectedAssignedRecruiters] = useState([]);



  return (
    <FormStep active>
      <div style={{ flex: 1 }}>
        <h6>Responsibilities and Requirements</h6>
      </div>

      <FormGroup>
        <FormLabel>Work Experience</FormLabel>
        <FormInput
          type="text"
          value={formData.workExperience || ""}
          placeholder={" 1 - 2 years"}
          onChange={(e) => handleChange("workExperience", e.target.value)}
          onBlur={(e) => handleChange("workExperience", e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Job Description</FormLabel>
        <textarea
            style={{ borderRadius: "5px" }}
            value={formData.jobDescription || ""}
            placeholder={" Job Description"}
            onChange={(e) => handleChange("jobDescription", e.target.value)}
            rows={6} 
            cols={40} 
        ></textarea>
      </FormGroup>
      <FormGroup>
        <FormLabel>Requirements</FormLabel>
        <textarea
            style={{ borderRadius: "5px" }}
            value={formData.requirements || ""}
            placeholder={" Requirements"}
            onChange={(e) => handleChange("requirements", e.target.value)}
            rows={6} 
            cols={40} 
        ></textarea>
      </FormGroup>
   
    </FormStep>
  );
};

export default StepThree;
