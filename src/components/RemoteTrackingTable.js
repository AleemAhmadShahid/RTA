import React from "react";
import LoaderComponent from "./Loader";
import styled from "styled-components";
import { Details } from "./EmpProfileMainPage";
import EmployeeInfo from "./EmployeeInfo";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { SaveAndNextButton } from "../styles/MultiStepFormStyling";
import { TbDroplets } from "react-icons/tb";
import { GiDroplets } from "react-icons/gi";
// import { Icon } from "../pages/IAM/EmpDashBoard/EmpDashBoard";
export const Box=styled.div`
display:flex;
justify-content:space-between;
background:white;
border-radius:10px;
padding:10px;
height:60px;
align-items:center;
box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);

`
export const FirstBox = styled.div`
  display: flex;
  // justify-content: space-between;
  // background: white;
  border-radius: 10px;
  padding: 10px;
  height: 60px;
  align-items: center;
  // box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  width: 500px; /* Fixed width of 100px */
`;


const DoneButton=styled.button`
background:#7FFFD4;
 padding:5px 30px;
color:white;
border-radius:5px;
justify-content:center;
align-items:center;
font-size:14px;
border:1px solid #7FFFD4;
`
const Icon = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  font-size:28px;
  
  color: grey;
`;
const RemoteTrackingTable = ({
  // loading,
  // data,
  // columns,
  // renderRow,
  // keyField,
}) => {
  return (






    <Box style={{marginBottom:"20px"}}>
      <FirstBox>
      <Details style={{fontSize:"18px",fontWeight:"500"}}>Cloud storage and File sharing</Details>
      </FirstBox><Details>Cloud storage </Details>
      <Details style={{fontSize:"14px",color:"grey"}}>8 Feb</Details>
      <div>
      <Icon style={{color:"red"}}>
      <GiDroplets  />
</Icon></div>
      <Icon >
      <IoChatbubbleEllipsesOutline/></Icon>
      <DoneButton>Done</DoneButton>
      <EmployeeInfo/>
    </Box>
   
  );
};

export default RemoteTrackingTable;
