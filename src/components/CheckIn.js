import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "../pages/ForgetPassword";
import EmpProfile, { BoxContainer, GreyHeading } from "./EmpProfileMainPage";
import { Details } from "../pages/MM/MeetingMainPage";
import EmployeeInfo from "./EmployeeInfo";
import { SaveAndNextButton, SaveButton } from "../styles/MultiStepFormStyling";

const Line = styled.hr`
  // margin:0;
`;

const TimeDiv = styled.div`
  font-size: 18px;
  font-weight:500;
  margin: 10px 0;
  color: #333;
`;

const CheckIn = ({ width = "350px", saveButtonText = "Check Out", saveAndNextButtonText = "Check In" }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <BoxContainer style={{ width,borderRadius: "20px",marginTop:"0" }}>
      <Box style={{ padding: "15px", borderRadius: "0" }}>
        <div style={{ display: "flex" }}>
          <Details
            style={{ color: "#ffa500", fontSize: "20px", marginRight: "10px", marginBottom: "10px" }}
          >
            Welcome ...
          </Details>
        </div>
        
        <Details style={{marginTop:"0px",fontSize:"16px"}}>Reporting Manager </Details>
        <EmployeeInfo /><TimeDiv>{formattedTime}</TimeDiv>
        <GreyHeading
          style={{
            margin: "0",
            fontWeight: "300",
            fontSize: "14px",
            marginBottom: "5px",
          }}
        >
          You are not Checked In yet today
        </GreyHeading>
        <Line />
        <div style={{ display: "flex" }}>
          <SaveButton
            style={{
              width: "100%",
              marginRight: "10px",
              border: "2px solid #ffa500",
              color: "#ffa500",
              padding: "7px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {saveButtonText}
          </SaveButton>
          <SaveAndNextButton
            style={{
              width: "100%",
              marginLeft: "10px",
              padding: "7px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {saveAndNextButtonText}
          </SaveAndNextButton>
        </div>
      </Box>
    </BoxContainer>
  );
};

export default CheckIn;
