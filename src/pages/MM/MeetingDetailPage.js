import React, { useState, useEffect } from "react";
import { CenteredContainer } from "../../styles/TableStyling";
import { ColumnContainer, LeftColumn, RightColumn } from "../EmpSetting";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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



const MeetingdetailPage=({})=>{
    const navigate = useNavigate();
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const {id} = useParams();
    const[loading,setLoading]=useState(false);
    // connt
    useEffect(() => {

      
      {
        const fetchData = async () => {
          setLoading(true);
          try {
            const data = await createGetRequest(`/api/meeting/${id}`);
            if (data.status==200)
              setSelectedMeeting(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
          setLoading(false);
    console.log("alem",id);
        };
        fetchData();
      }
     
    },[])
  
    if (!selectedMeeting) return null;
    return(

        <>
         <CenteredContainer >
          
         {selectedMeeting && ( 
        <ColumnContainer>
        <LeftColumn>
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
              <SaveAndNextButton>Update Meeting</SaveAndNextButton>
            </div>
          </Box>
        </BoxContainer>
        </LeftColumn>
        <RightColumn>
          {
            selectedMeeting.video &&  selectedMeeting.video.length > 0 && (
            <BoxContainer>
              <Box style={{padding:"20px"}}>
              <video width="100%" height="240" controls>
                <source src={selectedMeeting.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              </Box>
          </BoxContainer>
          )
          }
         {
            selectedMeeting.video &&  selectedMeeting.video.length > 0 && (
              <>
                
                <BoxContainer>
                    <Box style={{padding:"20px"}}>
                      <Details>Meeting Minutes:</Details>
                        {selectedMeeting.minutes.map((minute, index) => (
                          <p key={index}>{minute}</p>
                        ))}
                    </Box>
                </BoxContainer>
                <BoxContainer>
                  <Box style={{padding:"20px"}}>
                    <Details>Transpcript :</Details> {selectedMeeting.transcript}
                  </Box>
                </BoxContainer>
                
              </>
            )}
        </RightColumn>
        </ColumnContainer>
     )} 
        
        </CenteredContainer></>
    );
}
export default MeetingdetailPage;