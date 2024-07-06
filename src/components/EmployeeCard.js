import React from "react";
import styled from "styled-components";
import { UserImage } from "./EmployeeInfo";
import { H6 } from "../styles/MultiStepFormStyling";
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top:10px;
  margin-bottom:5px;
`;
const DetailButton = styled.button`
  border: 1px solid #ffa500;
  color: #ffa500;
  border-radius: 25px;
  background: white;
  padding: 5px 15px;
`;
const EmployeeCardContainer=styled.div`
width:220px;

`
const EmployeeCard = ({name,role}) => {
  return (
    <EmployeeCardContainer>
    <Box>
      <UserImage
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"
        alt="Profile Image"
        style={{ width: "90px", height: "90px",border:"1px solid #ffa500" }}
      />
      <h5 style={{ color: "#ffa500", marginTop: "5px"}}>{name}</h5>
      {/* <h6>{name}</h6> */}
      <H6 style={{ color: "grey", marginTop: "0",marginBottom:"5px" }}>{role}</H6>
      <DetailButton>Profile Detail</DetailButton>
    </Box>
    </EmployeeCardContainer>
  );
};

export default EmployeeCard;
