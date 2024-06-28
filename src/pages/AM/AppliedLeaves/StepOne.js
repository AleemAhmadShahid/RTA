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
        <FormLabel>Employee</FormLabel>
          <EntriesDropdown
            width="100%"
            value={(formData?.employee
              && {label: employee.find((employee) => employee.value == formData?.employee).label, value:formData?.employee})
              || {label: "", value: ""}}
            onChange={(selectedOption) =>{
                handleChange(
                  `employee`,
                  selectedOption.value
                );
              }
            }
            options={employee}
            styles={dropDownStyle}
          />
        
        </FormGroup>

      <FormLabel >Policy</FormLabel>
      <Step3Container>
        <BoxStep3Container>
          {policy.map((item, index) => (
            <Step3BorderBox key={index}>
              <Step3CloseButton
                onClick={() =>
                  removeItem(
                    index,
                    setPolicys,
                    policy,
                    "policy"
                  )
                }
              >
                ×
              </Step3CloseButton>

              <FormGroup>
                <FormLabel>Leave Type</FormLabel>
                  <EntriesDropdown
                    width="100%"
                  value={(formData?.policy?.[index]?.leaveType 
                    && {label: leaveType.find((leaveType) => leaveType.value == formData?.policy?.[index]?.leaveType).label, value: formData?.policy?.[index]?.leaveType})
                    || {label: "", value: ""}}
                  onChange={(selectedOption) =>{
                      handleChange(
                        `policy.${index}.leaveType`,
                        selectedOption.value
                      );
                    }
                  }
                  options={leaveType}
                  styles={dropDownStyle}
                />
                
                </FormGroup>

                <FormGroup>
                <FormLabel>Max Leaves</FormLabel>
                <FormInput
                  type="number"
                  value={formData?.policy?.[index]?.maxLeaves || ""}
                  onChange={(e) =>
                    handleChange(
                      `policy.${index}.maxLeaves`,
                      e.target.value
                    )
                  }
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Carry Forward Limit</FormLabel>
                <FormInput
                  type="number"
                  value={formData?.policy?.[index]?.carryForwardLimit || ""}
                  onChange={(e) =>
                    handleChange(
                      `policy.${index}.carryForwardLimit`,
                      e.target.value
                    )
                  }
                />
              </FormGroup>
            </Step3BorderBox>
          ))}
        </BoxStep3Container>
        <Step3AddButton
          onClick={() => addItem(setPolicys, policy)}
        >
          Add Policy
        </Step3AddButton>
      </Step3Container>
      
      <FormGroup>
        <FormLabel>Duration</FormLabel>
          <EntriesDropdown
            width="100%"
            value={(formData?.duration
              && {label: duration.find((duration) => duration.value == formData?.duration).label, value:formData?.duration})
              || {label: "", value: ""}}
            onChange={(selectedOption) =>{
                handleChange(
                  `duration`,
                  selectedOption.value
                );
              }
            }
            options={duration}
            styles={dropDownStyle}
          />
        
        </FormGroup>

        <FormGroup>
        <FormLabel>Renewal Period</FormLabel>
          <EntriesDropdown
            width="100%"
            value={(formData?.renewAt
              && {label: renewalAt.find((renewAt) => renewAt.value == formData?.renewAt).label, value:formData?.renewAt})
              || {label: "", value: ""}}
            onChange={(selectedOption) =>{
                handleChange(
                  `renewAt`,
                  selectedOption.value
                );
              }
            }
            options={renewalAt}
            styles={dropDownStyle}
          />
        
        </FormGroup>

    </FormStep>
  );
};

export default StepOne;
