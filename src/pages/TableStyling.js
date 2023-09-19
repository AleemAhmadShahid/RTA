import React from "react";
import { styled } from "styled-components";


export const CreateEmployeeHeading = styled.h6`
  margin-bottom: 10px;
  width: 100%;
  right: 0%;
  font-weight: lighter;
  fontsize: "smaller";
`;

export const Th = styled.th`
  background: #f3f2f7;
  color: #6e6b7b;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  height: 30px;
  top: 10%;
  padding: 9px 62.4px;
  font-weight: medium;
   width: 100%;
  font-size: 0.7rem;
  text-align: center;


  white-space: nowrap; /* Prevent text from wrapping */
   

  @media screen and (width: 78%;) {
    padding: 0px 20px;
  }
`;

export const Tr = styled.tr`
//   padding: 1px 0px;
//  text-align: center;
//   border-bottom: 0px solid #ddd;
 margin: 100px;
`;
export const Td = styled.td`
  padding: 4px;
   white-space: nowrap;
  width: 100%; /* Set the width to 100% */
  text-align: center;
  
  border-top: 1px solid #ededed;
   vertical-align: center;
  color: #6e6b7b;
  font-weight: medium;
  font-size: 0.7rem;
`;

export const Table = styled.table`
  position: stick;
  table-layout: fixed;
  margin-top: 27px;
  width: 100%;
//   border-bottom: none;
//   color: #ffa500;
  backgorund-color: #ffa500;
  border-collapse: collapse;
  border-spacing: 10px 5px;
  border: 0px solid #ccc;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
export const AddEmployeeContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SuccessBadge = styled.span`
  background-color: rgba(40, 199, 111, 0.12) !important;
  color: #28c76f !important;
  padding: 5px 14px;
  border-radius: 4px;
`;

export const DangerBadge = styled.span`
  background-color: #ea54542c;
  color: #ea5455;
  padding: 4px 12px;
  border-radius: 4px;
`;

export const UserImage = styled.img`
  width: 39px;
  height: 31px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -4px;
`;