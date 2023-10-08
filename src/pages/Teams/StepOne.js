import React , { useState, useEffect } from "react";
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

import { StyledErrorH6 } from "../Login";

import { validateAlphanumericWithSpace } from "../../global/validators";

const StepOne = ({ formData, errors, handleChange, id, pageName }) => {

  const [employee, setEmployees] = useState([{}]);
  const [selectedEmployee, setSelectedEmployee] = useState({label: "Select", "value": {}});
  const [superDepartment, setSuperDepartments] = useState([{}]);
  const [selectedSuperDepartment, setSelectedSuperDepartment] = useState({label: "Select", "value": {}});
  
  useEffect(() => {
    const fetchData = async () => {
      console.log(formData);
      try {
        const userData = await createGetRequest("/api/user");
        if (userData.status == 200)
        {
          const employees = userData.users.map((employee) => ({ label: employee.name, value: employee._id }));
          setEmployees(employees);
          if(formData?.lead)
          {
            const findSelectedEmployee = userData.users.find((employeeObj)=> formData.lead == employeeObj._id);
            setSelectedEmployee({ label: findSelectedEmployee.name, value: findSelectedEmployee._id });
          }
        }
        const superDepartmentData = await createGetRequest("/api/department", { type: 1});
        if (superDepartmentData.status == 200)
        {
          const superDepartments = superDepartmentData.departments.map((departmentObj) => ({ label: departmentObj.name, value: departmentObj._id }));
          setSuperDepartments(superDepartments);
          if(formData?.superDepartment)
          {
            const findSelectedSuperDepartment = superDepartmentData.departments.find((departmentObj)=> formData.superDepartment == departmentObj._id);
            setSelectedSuperDepartment({ label: findSelectedSuperDepartment.name, value: findSelectedSuperDepartment._id });
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
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormInput
          type="text"
          value={formData.name || ""}
          placeholder={" Name"}
          onChange={(e) =>
            handleChange("name", e.target.value, validateAlphanumericWithSpace)
          }
          onBlur={(e) =>
            handleChange("name", e.target.value, validateAlphanumericWithSpace)
          }
          required
        />
      </FormGroup>
      {errors.name && <StyledErrorH6>{errors.name}</StyledErrorH6>}
      
      <FormGroup>
        <FormLabel>{pageName[id-1].columnName}</FormLabel>
        <EntriesDropdown
            width="100%"
            value={selectedEmployee}
            onChange={(selectedOption) =>{
              setSelectedEmployee(selectedOption);
              handleChange("lead", selectedOption.value);
            }}
            options={employee}
            styles={dropDownStyle}
          />
      </FormGroup>

      <FormGroup>
        <FormLabel>Supervising Department</FormLabel>
        <EntriesDropdown
            width="100%"
            value={selectedSuperDepartment}
            onChange={(selectedOption) =>{
              setSelectedSuperDepartment(selectedOption);
              handleChange("superDepartment", selectedOption.value);
            }}
            options={superDepartment}
            styles={dropDownStyle}
          />
      </FormGroup>
      
    </FormStep>
  );
};

export default StepOne;
