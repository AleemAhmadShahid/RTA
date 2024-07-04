import React from "react";
import styled from "styled-components";
import { Box } from "../pages/ForgetPassword";
import EmpProfile, { BoxContainer, GreyHeading } from "./EmpProfileMainPage";
import { Details } from "../pages/MM/MeetingMainPage";
import EmployeeInfo from "./EmployeeInfo";
import {  SaveAndNextButton, SaveButton } from "../styles/MultiStepFormStyling";
import { UserImage } from "./EmployeeInfo";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../pages/IAM/EmpDashBoard/EmpDashBoard";
import { IoIosVideocam } from "react-icons/io";

const Line=styled.hr`
margin:0;

`
const MeetingDetails = ({title,creator, attendees,meetingId ,onViewDetails, onSaveAndNext}) => {
  const navigate = useNavigate(); 
  // const {meetingId} = useParams();

  const handleSaveAndNext = () => {
    navigate(`/portal/meetingmanagemnetsystem/meeting/${meetingId}`);
  };
  const handleViewDetails = (meetingId) => {
    // setSelectedMeeting(meeting);
    navigate(`/portal/meetingmanagemnetsystem/meeting/${meetingId}`);
  };


  
  const defaultImageUrl =
    "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

   const displayAttendees = attendees.slice(0, 2);
  
  return (
    <BoxContainer style={{ minWidth: "300px",borderRadius:"15px"}}>
      <Box style={{ padding: "20px" }}>
        <div style={{alignItems:"center",justifyContent:"space-between",display:"flex",marginBottom:"20px"}}>
      <Icon style={{background:"none",border:"1px solid #ffa500",color:"#ffa500"}}>
<IoIosVideocam/>
      </Icon>
       
           <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "right", alignItems: "center" }}>
          {displayAttendees.map((attendee, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginLeft: "-20px"}}>
              <UserImage
                src={attendee.profileImg || defaultImageUrl}
                alt="Profile Image"
                style={{ width: "35px", height: "35px", borderRadius: "50%" ,border:"2px solid #ffa500"}}
              />
            </div>
          ))}
          {attendees.length > 3 && (
            <div style={{ display: "flex", alignItems: "center", marginLeft: "-20px" }}>
              <UserImage
                src={attendees[2]?.profileImg || defaultImageUrl}
                alt="Profile Image"
                style={{ width: "35px", height: "35px", borderRadius: "50%",border:"2px solid #ffa500"}}
              />
              <span style={{ fontSize: "14px", color: "#ffa500", fontWeight: "600" }}>+{attendees.length - 2}</span>
            </div>
          )}
        </div>
        {/* </div> */}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <img
      src="/Shaheer.jpeg"
      alt="Profile Image"
      style={{ width: '55px', height: '55px', borderRadius: '50%' }}
    />
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
      <Details style={{ fontSize: '14px', margin: '0' }}>{title}</Details>
      <Details style={{ fontSize: '12px', color: 'grey', margin: '0' }}>By {creator}</Details>
    </div>
  </div>
       

        
        <Line style={{marginTop:"20px",marginBottom:"0px"}}/>
        {/* <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <div style={{display:"flex",marginBottom:"20px"}}>
         
          </div>
           <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
          {displayAttendees.map((attendee, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginRight: "10px", marginBottom: "10px" }}>
              <UserImage
                src={attendee.profileImg || defaultImageUrl}
                alt="Profile Image"
                style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
              />
            </div>
          ))}
          {attendees.length > 3 && (
            <div style={{ display: "flex", alignItems: "center", marginRight: "10px", marginBottom: "10px" }}>
              <UserImage
                src={attendees[2]?.profileImg || defaultImageUrl}
                alt="Profile Image"
                style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
              />
              <span style={{ fontSize: "14px", color: "#ffa500", fontWeight: "600" }}>+{attendees.length - 2}</span>
            </div>
          )}
        </div>
        </div> */}
          <SaveAndNextButton onClick={handleSaveAndNext} style={{ width: "100%", fontSize: "14px", fontWeight: "500", marginTop: "20px", borderRadius: "20px" }}>
          View Details
        </SaveAndNextButton>
        
      </Box>
    </BoxContainer>
  );
};
export default MeetingDetails;
