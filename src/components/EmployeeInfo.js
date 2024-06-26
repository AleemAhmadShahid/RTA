import React from "react";
import styled from "styled-components";

export const UserImage = styled.img`
  width: 39px;
  height: 31px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -5px;
`;

export const Td = styled.td`
  padding: 0px;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  border-top: 0px solid #ededed;
  vertical-align: left;
  color: black;
  font-weight: medium;
  font-size: 0.7rem;
`;

export const EmployeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    span {
      color: #ffa500;
    }
  }
`;

const EmployeeName = styled.span`
  text-align: left;
  color: #6e6b7b;
  font-weight: 700;
`;

const EmployeeEmail = styled.span`
  font-size: 11px;
  color: grey;
  text-align: left;
`;

const EmployeeInfo = ({ employee, isSpaceRequired,margin,style }) => {
  
  const defaultImageUrl = "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

  return (
    <tr>
      <Td>
        <div style={{ display: "flex", alignItems: "center" }}>
           <UserImage
              src={employee?.profileImg || defaultImageUrl}
            alt="Profile Image"
            style={{ ...(isSpaceRequired === true ? { marginLeft: '40px' } : {}),
            ...(margin ? { margin } : {}) ,
            ...style
          }}

            
          /> 
          <EmployeeContainer>
            <EmployeeName>{employee?.name}</EmployeeName>
            <EmployeeEmail>{employee?.email}</EmployeeEmail> 
          </EmployeeContainer>
        </div>
      </Td>
    </tr>
  );
};

export default EmployeeInfo;
