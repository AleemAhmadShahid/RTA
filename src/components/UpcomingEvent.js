import React from "react";
import styled from "styled-components";

export const EventImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;

`;



export const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left:10px;
 

`;

const EventName = styled.span`
  text-align: left;
  color: black;
   font-size: 14px;

`;

const EventDate = styled.span`
  font-size: 12px;
  color: grey;
  text-align: left;
`;

const UpcomingEvent = ({ event, date }) => {
  
  

  return (
    
      
        <div style={{ display: "flex", alignItems: "center" ,marginTop:"20px"}}>
           <EventImage
               src="/Shaheer.jpeg"
            alt="Profile Image"
            
          /> 
          <EventContainer>
            <EventName>{event}</EventName> 
            <EventDate>{date}</EventDate>
          </EventContainer>
          
        </div>
      
  );
};

export default UpcomingEvent;
