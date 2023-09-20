import React from "react";
import styled from "styled-components";

const UserImage = styled.img`
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

const EmployeeInfo = ({ employee }) => {
  // Define a default image URL
  const defaultImageUrl = "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

  return (
    <tr>
      <Td>
        <div style={{ display: "flex", alignItems: "center" }}>
          <UserImage
            src={employee.profileImg || defaultImageUrl}
            alt="Profile Image"
            style={{ marginLeft: "6px" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{  textAlign: "left", color: "#6e6b7b", fontWeight: "700" }}>
              {employee.name}
            </span>
            <span style={{ fontSize: "11px", color: "grey", textAlign: "left" }}>
              {employee.email}
            </span>
          </div>
        </div>
      </Td>
    </tr>
  );
};

export default EmployeeInfo;
