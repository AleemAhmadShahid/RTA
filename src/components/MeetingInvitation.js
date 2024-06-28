import React from "react";
import styled from "styled-components";
import { Box } from "../pages/ForgetPassword";
import EmpProfile, { BoxContainer, GreyHeading } from "./EmpProfileMainPage";
import { Details } from "../pages/MM/MeetingMainPage";
import EmployeeInfo from "./EmployeeInfo";
import {  SaveAndNextButton, SaveButton } from "../styles/MultiStepFormStyling";

const Line=styled.hr`
margin:0;

`
const MeetingInvitation = ({ width = "350px", saveButtonText = "I can't", saveAndNextButtonText = "Accept Event" }) => {
  return (
    <BoxContainer style={{ width }}>
      <Box style={{ padding: "15px",borderRadius:"10px"}}>
        <div style={{ display: "flex" }}>
          <Details
            style={{ color: "#ffa500", fontSize: "13px", marginRight: "10px" }}
          >
            {" "}
            3 July
          </Details>
          <Details
            style={{
              background: "#ffa500",
              fontSize: "10px",
              color: "white",
              display: "inline-block",
              borderRadius: "10px",
              padding: "2px 10px",
            }}
          >
            {" "}
            Wed
          </Details>
          <div style={{ marginLeft: "auto" }}>
            {/* <Details style={{ fontSize: "13px" }}> 07:00 PM</Details> */}
          </div>
        </div>
        <Details style={{ marginBottom: "5px" }}>
          {" "}
          Casual Leave
        </Details>
        <GreyHeading
          style={{
            margin: "0",
            fontWeight: "300",
            fontSize: "13px",
            marginBottom: "5px",
          }}
        >
          Family Trip
        </GreyHeading>

        {/* <div style={{ display: "flex", alignItems: "center" }}>
          <GreyHeading
            style={{ margin: "0", fontWeight: "400", fontSize: "12px" }}
          >
            Creator
          </GreyHeading>
          <EmployeeInfo style={{ margin: "0" }} />
          <div style={{ marginLeft: "auto" }}>
          <EmployeeInfo style={{ margin: "0" }} />
            </div>
          <div />
        </div> */}
        <Line/>
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
export default MeetingInvitation;
