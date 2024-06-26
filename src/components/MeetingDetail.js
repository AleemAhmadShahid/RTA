import React from "react";
import styled from "styled-components";
import { Box } from "../pages/ForgetPassword";
import EmpProfile, { BoxContainer, GreyHeading } from "./EmpProfileMainPage";
import { Details } from "../pages/MM/MeetingMainPage";
import EmployeeInfo from "./EmployeeInfo";
import {  SaveAndNextButton, SaveButton } from "../styles/MultiStepFormStyling";
import { UserImage } from "./EmployeeInfo";
const Line=styled.hr`
margin:0;

`
const MeetingDetails = () => {
  return (
    <BoxContainer style={{ width: "250px",borderRadius:"15px" }}>
      <Box style={{ padding: "30px" }}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <UserImage
        src="/Shaheer.jpeg"
        alt="Profile Image"
        style={{ width: "55px", height: "55px" }}
      />
     <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
        <Details style={{ fontSize: "13px",margin:"0" }}>Designer Meetup</Details>
        <GreyHeading style={{  fontSize: "12px" }}>Panoply Store</GreyHeading>
      </div>
        </div>
        
       

        
        <Line style={{marginTop:"20px",marginBottom:"20px"}}/>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <div style={{display:"flex",marginBottom:"20px"}}>
          <Details style={{ fontSize: "14px",margin:"0",color:"#ffa500" }}>4 Members Going </Details>
          <GreyHeading style={{ fontSize: "14px",margin:"0" }}> - 3 Pending </GreyHeading>
          </div>
          <EmployeeInfo/>
        </div>
          <SaveAndNextButton style={{ width: "100%",fontSize:"14px",fontWeight:"500",marginTop:"20px"}}>
            View Details
          </SaveAndNextButton>
        
      </Box>
    </BoxContainer>
  );
};
export default MeetingDetails;
