import React, { useState } from "react";
import { CenteredContainer } from "../../styles/TableStyling";
import { ColumnContainer, LeftColumn, RightColumn } from "../EmpSetting";
// import { Box } from "../EmpSetting";
import { Box } from "../ForgetPassword";
import { BoxContainer } from "../../components/EmpProfileMainPage";
import styled from "styled-components";
import EmployeeInfo from "../../components/EmployeeInfo";
import { TextArea } from "../CardsPopup";
// import { AddButton } from "../../components/AddTask";
import {
  SaveAndNextButton,
  SaveButton,
} from "../../styles/MultiStepFormStyling";
import MeetingInvitation from "../../components/MeetingInvitation";
import MeetingDetails from "../../components/MeetingDetail";
import EditableEmployeeTable from "../../components/EditableTable";
import EmployeeTable from "../../components/Table";
import { HeadingAndSearchContainer } from "../../styles/TableStyling";
import { AddEmployeeButton } from "../../styles/TableStyling";
export const Details = styled.h6`
  font-size: 16px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-weight: 500;
`;
const MeetingMainaPage = () => {
  const [checkedEmployees, setCheckedEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // Static data
  const initialData = [
    { _id: 1, name: "John Doe", email: "john@example.com" },
    { _id: 2, name: "Jane Doe", email: "jane@example.com" },
  ];

  const columns = [
    { field: "name", label: "Name" },
    { field: "hours", label: "Hours" },
    { field: "deduction", label: "Deduction Rate" },
    { field: "action", label: "Actions" },
  ];

  return (
    <CenteredContainer>
     
       <BoxContainer>
      <Box style={{  padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Details>Meeting Room Booking Cancelation Policy</Details>
          <AddEmployeeButton
            // onClick={toggleForm}
            className="btn btn-primary mb-2"
          >
            <span style={{ whiteSpace: "nowrap" }}>+ Add Policy</span>
          </AddEmployeeButton>
        </div>
        <EditableEmployeeTable
          checkedEmployees={checkedEmployees}
          setCheckedEmployees={setCheckedEmployees}
          loading={loading}
          initialData={initialData}
          columns={columns}
          keyField="_id"
        />
      </Box></BoxContainer>
      <MeetingInvitation />
      <MeetingDetails />
      <ColumnContainer>
        <LeftColumn>
          <BoxContainer>
            <Box style={{ padding: "20px" }}>
              <h5 style={{ marginBottom: "30px" }}>Meeting Name</h5>
              <ColumnContainer>
                <LeftColumn>
                  <Details style={{ marginBottom: "25px" }}> Assignee</Details>
                  <Details> Meeting Date</Details>
                  <Details> Meeting Time</Details>
                  <Details> Meeting Type</Details>
                </LeftColumn>
                <RightColumn>
                  <Details style={{ color: "blue" }}>
                    {" "}
                    <EmployeeInfo employee={{ name: "Shaheer" }} />
                  </Details>
                  <Details style={{ color: "blue" }}> Set Date</Details>
                  <Details style={{ color: "blue" }}> Set Time</Details>
                  <Details style={{ color: "blue" }}> SetMeeting Type</Details>
                </RightColumn>
              </ColumnContainer>
              <hr />
              <div>
                <Details style={{}}> Description</Details>
                <TextArea
                  rows={4}
                  style={{
                    width: "100%",
                    resize: "none",
                    fontSize: "14px",

                    border: "1px solid #ccc",
                    margin: "0",
                  }}
                />
              </div>
              <hr />
              <Details
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "20px",
                }}
              >
                {" "}
                Attendees
              </Details>
              <EmployeeInfo employee={{ name: "Shaheer", email: "ahhek" }} />

              <EmployeeInfo employee={{ name: "Shaheer", email: "ahhek" }} />

              <EmployeeInfo employee={{ name: "Shaheer", email: "ahhek" }} />

              <EmployeeInfo employee={{ name: "Shaheer", email: "ahhek" }} />
              <hr />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <SaveButton>Cancel</SaveButton>
                <SaveAndNextButton>Create Meeting</SaveAndNextButton>
              </div>
            </Box>
          </BoxContainer>
        </LeftColumn>
        <RightColumn>
          {/* <BoxContainer>
            <Box>
              <h5>Meeting Name</h5>
            </Box>
          </BoxContainer>*/} 
        </RightColumn>
      </ColumnContainer> 
    </CenteredContainer>
  );
};
export default MeetingMainaPage;
