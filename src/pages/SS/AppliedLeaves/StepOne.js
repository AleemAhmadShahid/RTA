import React, { useState, useEffect } from "react";
import {
  FormStep,
  FormGroup,
  FormInput,
  PictureUploadButton,
  FormLabel,
  Step3Container,
  BoxStep3Container,
  Step3BorderBox,
  Step3CloseButton,
  Step3AddButton,
  H6,
} from "../../../styles/MultiStepFormStyling";
import {
  EntriesDropdown,
  dropDownStyle
  } from "../../../styles/TableStyling";
import {  createGetRequest } from "../../../global/requests";


const StepOne = ({ formData, handleChange }) => {
  const [policy, setPolicys] = useState([]);
  const [leaveType, setLeaveType] = useState([]);
  const [employee, setEmployee] = useState([]);
  const duration = [
    {
      "label": "Yearly",
      "value": 1
      
    },
    {
      "label": "Monthly",
      "value": 2
    }
  ];

  const renewalAt = [
    {
      "label": "Renew on the 1st of each period",
      "value": 1
      
    },
    {
      "label": "Renew on the same date after each period from the start.",
      "value": 2
    }
  ];


  useEffect(() => {


    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/leave/leaveTypes");
        if (data.status === 404) {
          setLeaveType([]);
          return;
        }
        setLeaveType(data.leaveTypes.map((leaveType) => ({label: leaveType.name, value: leaveType._id})));
        try
        {
          const data = await createGetRequest("/api/user/");
          setEmployee(data.users.map((user) => ({label: user.name, value: user._id})))
        }
        catch(error)
        {}
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
    fetchData();
 
    if (formData && (formData.policy || formData.experience)) {
      if(formData.policy)
        setPolicys(formData.policy);
     
    }
  }, []);

  const addItem = (setFunction, state) => {
    setFunction([...state, state.length]);
  };

  
  const removeItem = (index, setFunction, state, key) => {
    const newState = [...state];
    newState.splice(index, 1);
    setFunction(newState);

    // Check if formData[key] is an array before attempting to splice
    if (Array.isArray(formData[key])) {
      const newData = [...formData[key]];
      newData.splice(index, 1);
      handleChange(key, newData);
    }
  };

  return (
    <FormStep active>
   

      <FormGroup>
        <FormLabel>Leave Type</FormLabel>
          <EntriesDropdown
            width="100%"
          value={(formData?.leaveType 
            && {label: leaveType.find((leaveType) => leaveType.value == formData?.leaveType).label, value: formData?.leaveType})
            || {label: "", value: ""}}
          onChange={(selectedOption) =>{
              handleChange(
                `leaveType`,
                selectedOption.value
              );
            }
          }
          options={leaveType}
          styles={dropDownStyle}
        />
        
        </FormGroup>

     
    </FormStep>
  );
};

export default StepOne;
