import React from "react";
import styled from "styled-components";

export const EventImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;

`;



export const AnnoucementContainer = styled.div`
  display: flex;
  flex-direction: column;
//   margin-left:10px;
 

`;

const AnnoucementName = styled.span`
  text-align: left;
  color: black;
   font-size: 16px;
   font-weight:500;

`;
const AnnoucementDetails = styled.span`
  text-align: left;
  color: black;
   font-size: 14px;

`;

const AnnoucementDate = styled.span`
  font-size: 12px;
  color: grey;
  text-align: left;
`;

const Annoucemnet = ({ event,details, date }) => {
  
  

  return (
    
      
        <div style={{ display: "flex", alignItems: "center" ,marginTop:"20px",justifyContent:"space-between",borderBottom:"1px solid grey"}}>
          
          <AnnoucementContainer>
            <AnnoucementName>{event}</AnnoucementName> 
            <AnnoucementDetails>{details}</AnnoucementDetails> 
            <AnnoucementDate>{date}</AnnoucementDate>
          </AnnoucementContainer>
           <EventImage
               src="/event.jpeg"
            alt="Profile Image"
            
          /> 
        </div>
      
  );
};

export default Annoucemnet;
