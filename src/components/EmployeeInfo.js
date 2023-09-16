import React from "react";
import styled from "styled-components";


const Td = styled.td`
  padding: 8px 13px;
  white-space: nowrap;
  text-align: center;
  border-top: 1px solid #ededed;
  // margin: 100px;
  vertical-align: middle;
  color: black;
  // font-weight: 100;
  font-weight: medium;
  font-size: 13px;
`;
const UserImage = styled.img`
  width: 39px;
  height: 31px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -4px;
`;



const EmployeeInfo = ({ employee }) => {
  return (
    <tr>
      <Td>
        {employee.profileImg && <UserImage src={employee.profileImg} />}
      </Td>
      <Td>{employee._id}</Td>
      <Td>
        {employee.name}
        <br />
        <span style={{ fontSize: "12px", color: "grey" }}>{employee.email}</span>
      </Td>
    </tr>
  );
};

// Define the styled components used in EmployeeInfo here

export default EmployeeInfo;
