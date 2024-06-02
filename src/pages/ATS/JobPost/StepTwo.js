import React, { useState, useEffect } from "react";

import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  
} from "../../../styles/MultiStepFormStyling";
import {
  EntriesDropdown,
  dropDownStyle
  } from "../../../styles/TableStyling";
import { createGetRequest } from "../../../global/requests";
import Select from 'react-select';

const StepTwo = ({ formData, handleChange }) => {
  const [role, setRoles] = useState([{}]);
  const [selectedRole, setSelectedRole] = useState({label: "Select", "value": {}});

  const [department, setDepartments] = useState([{}]);
  const [selectedDepartment, setSelectedDepartment] = useState({label: "Select", "value": {}});

  const [user, setUsers] = useState([{}]);
  const [selectedHiringManager, setSelectedHiringManager] = useState({label: "Select", "value": {}});
  const [selectedAssignedRecruiters, setSelectedAssignedRecruiters] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const roleData = await createGetRequest("/api/role");
        if (roleData.status === 200)
        {
          const roles = roleData.roles.map((role) => ({ label: role.name, value: role._id }));
          setRoles(roles);
          if(formData.role)
          {
            const findSelectedRole = roleData.roles.find((roleObj)=> formData.role === roleObj._id);
            setSelectedRole({ label: findSelectedRole.name, value: findSelectedRole._id });
          }
        }

        const departmentData = await createGetRequest("/api/department?type=1");
        if (departmentData.status === 200)
        {
          const departments = departmentData.departments.map((department) => ({ label: department.name, value: department._id }));
          setDepartments(departments);
          if(formData.departmentName)
          {
            const findSelectedDepartment = departmentData.departments.find((departmentObj)=> formData.departmentName === departmentObj._id);
            setSelectedDepartment({ label: findSelectedDepartment.name, value: findSelectedDepartment._id });
          }
        }

        const userData = await createGetRequest("/api/user");
        if (userData.status === 200)
        {
          const users = userData.users.map((user) => ({ label: user.name, value: user._id }));
          setUsers(users);
          if(formData.hiringManager)
          {
            const findSelectedHiringManager = userData.users.find((userObj)=> formData.hiringManager === userObj._id);
            setSelectedHiringManager({ label: findSelectedHiringManager.name, value: findSelectedHiringManager._id });
          }
          if(formData.assignedRecruiters.length > 0)
          {
            const findSelectedAssignedRecruiters = userData.users
                .filter((userObj) => formData.assignedRecruiters.includes(userObj._id))
                .map(item => ({ label: item.name, value: item._id }));
            setSelectedAssignedRecruiters(findSelectedAssignedRecruiters);
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
        <h6>Organizational Information</h6>
      </div>

      <FormGroup>
        <FormLabel>Role</FormLabel>
        <EntriesDropdown
            width="100%"
            value={selectedRole}
            onChange={(selectedOption) =>{
              setSelectedRole(selectedOption);
              handleChange("role", selectedOption.value);
            }}
            options={role}
            styles={dropDownStyle}
          />
      </FormGroup>

      <FormGroup>
        <FormLabel>Department</FormLabel>
        <EntriesDropdown
            width="100%"
            value={selectedDepartment}
            onChange={(selectedOption) =>{
              setSelectedRole(selectedOption);
              handleChange("departmentName", selectedOption.value);
            }}
            options={department}
            styles={dropDownStyle}
          />
      </FormGroup>
      <FormGroup>
        <FormLabel>Hiring Manager</FormLabel>
        <EntriesDropdown
            width="100%"
            value={selectedHiringManager}
            onChange={(selectedOption) =>{
              setSelectedHiringManager(selectedOption);
              handleChange("hiringManager", selectedOption.value);
            }}
            options={user}
            styles={dropDownStyle}
          />
      </FormGroup>
      <FormGroup>
        <FormLabel>Assigned Recruiters</FormLabel>
        <Select
          isMulti 
          options={user}
          value={selectedAssignedRecruiters}
          onChange={(selected) => {
            setSelectedAssignedRecruiters(selected);
            handleChange("assignedRecruiters", selected.map(item => item.value));
          }}
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
    </FormStep>
  );
};

export default StepTwo;
