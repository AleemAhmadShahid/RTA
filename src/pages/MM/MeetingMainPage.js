import React, { useState, useEffect } from "react";
import { CenteredContainer } from "../../styles/TableStyling";
import { ColumnContainer, LeftColumn, RightColumn } from "../EmpSetting";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  createGetRequest,
  createDeleteRequest,
  createPutRequest,
} from "../../global/requests";
import { Box } from "../ForgetPassword";
import { BoxContainer } from "../../components/EmpProfileMainPage";
import styled from "styled-components";
import EmployeeInfo from "../../components/EmployeeInfo";
import { TextArea } from "../CardsPopup";

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
import LoaderComponent from "../../components/Loader";
// import { ScrollContainer } from "../PayM/PayMDashBoard";
export const Details = styled.h6`
  font-size: 16px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-weight: 500;
`;
export const ScrollContainer = styled.div`
   display: flex;
   overflow-x: auto;
   white-space: nowrap;
   -webkit-overflow-scrolling: touch;

   &::-webkit-scrollbar {
     display: none;
   }
 `

const MeetingMainaPage = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeeting, setSelectedMeeting] = useState(null);


  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await createGetRequest("/api/meeting");
        console.log(data); 
        setMeetings(data.meetings); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meetings data:", error);
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const [checkedEmployees, setCheckedEmployees] = useState([]);
  // const [loading, setLoading] = useState(false);

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
  const handleViewDetails = (meeting) => {
    setSelectedMeeting(meeting);
    //  navigate(`/meeting-details/${meeting._id}`);
  };
  const handleSaveAndNext = (meetingId) => {
    navigate(`/portal/meetingmanagemnetsystem/meeting/${meetingId}`);
  };
  return (
    <>
    <CenteredContainer>
      <ScrollContainer>
       {loading ? (
                <LoaderComponent/>
              ) : (
                meetings.map((meeting) => (
                  <MeetingDetails
                    key={meeting._id}
                    title={meeting.title}
                    creator={meeting.createdBy.name}
                    startTime={meeting.startTime}
                    endTime={meeting.endTime}
                    attendees={meeting.attendees}
                    description={meeting.description}
                    onViewDetails={() => handleViewDetails(meeting)}
                    onSaveAndNext={() => handleSaveAndNext(meeting._id)}
                    
                  />
                ))
              )}
              </ScrollContainer>
              </CenteredContainer>   
      {/* <BoxContainer>
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
      <MeetingDetails /> */}
      
       {/* <CenteredContainer>
        {selectedMeeting && (
        <ColumnContainer>
        <BoxContainer>
          <Box style={{ padding: "20px" }}>
            <h5 style={{ marginBottom: "30px" }}>{selectedMeeting.title}</h5>
            <ColumnContainer>
              <LeftColumn >
                <Details style={{ marginBottom: "25px" }}> Assignee</Details>
                <Details> Meeting Date</Details>
                <Details> Meeting Time</Details>
                <Details> Meeting Type</Details>
              </LeftColumn>
              <RightColumn>
                <Details style={{ color: "blue" }}>
                  <EmployeeInfo employee={{ name: selectedMeeting.createdBy.name }} />
                </Details>
                <Details style={{ color: "blue" }}>   {format(new Date(selectedMeeting.startTime), 'MMMM d, yyyy')} </Details>
                <Details style={{ color: "blue" }}> {format(new Date(selectedMeeting.startTime), 'h:mm a')} - {format(new Date(selectedMeeting.endTime), 'h:mm a')}</Details>
                <Details style={{ color: "blue" }}>  {selectedMeeting.type || "N/A"}</Details>
              </RightColumn>
            </ColumnContainer>
            <hr />
            <div>
              <Details style={{}}> Description</Details>
              <TextArea
                rows={4}
                value={selectedMeeting.description}
                style={{
                  width: "100%",
                  resize: "none",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  margin: "0",
                }}
                readOnly
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
            {selectedMeeting.attendees.map((attendee, index) => (
              <EmployeeInfo key={index} employee={attendee} />
            ))}
            <hr />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <SaveButton onClick={() => setSelectedMeeting(null)}>Cancel</SaveButton>
              <SaveAndNextButton>Create Meeting</SaveAndNextButton>
            </div>
          </Box>
        </BoxContainer>
        </ColumnContainer>
      )}
        
        </CenteredContainer> */}
        </>
    
  );
};
export default MeetingMainaPage;
