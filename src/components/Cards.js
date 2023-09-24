import React from "react";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
import { IconType } from "react-icons";

const BoxContainer = styled.div`
   position: relative;
  // width:50%;
  // margin-right:10px;
  //  width:90%;
  
`;

const InfoBoxContainer = styled.div`

  display: flex;
 
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 14px 20px;
  border-radius: 5px;
  //  margin-right: 1px;
   
   margin-bottom: 20px;
  width: 100%; /* Default width for all screen sizes */
 
  /* Add media queries for different screen sizes */
  
  @media screen and (max-width: 1200px) {
    /* Adjust width for smaller screens */
    width: 80%;
  }
@media screen and (max-width: 768px) {
    /* Adjust width for smaller screens */
    width: 50%;
  }

  /* Add more media queries as needed */

  // z-index: 1;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
`;

const InfoIcon = styled.div`
  font-size: 18px;
  color: ${(props) => (props.iconColor ? props.iconColor : "#ffa500")};
  border: 0px solid ${(props) => (props.iconColor ? props.iconColor : "#ffa500")};
  border-radius: 50%;
  display: flex; /* Use flexbox */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  width: 39px; /* Set a fixed width for the circular container */
  height: 39px; /* Set a fixed height for the circular container */
  background-color: ${(props) =>
    props.iconColor
      ? `${props.iconColor}30` /* 80% opacity, adjust as needed */
      : "grey"}; /* Generic grey background color */
  margin-right: 1px; /* Add margin for spacing between icons */
`;




const InfoNumbers = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const InfoText = styled.div`
  font-size: 14px;
  color: #333; /* Adjust the text color as needed */
`;
const InfoBoxItem = styled.div`
  flex: 0 0 calc(50% - 20px); /* Set 2 cards per line with spacing */
  margin: 10px; /* Add margin to create spacing between cards */
`;

const InfoBox = ({ top, icon: Icon, iconColor, data, text }) => {
  return (
    <BoxContainer>
      
      <InfoBoxContainer top={top}>
        <div>
          <InfoNumbers>{data}</InfoNumbers>
          <InfoText>{text}</InfoText>
        </div>
        {/* Render the provided icon component */}
        <InfoIcon iconColor={iconColor}>
          <Icon />
        </InfoIcon>
      </InfoBoxContainer>
    </BoxContainer>
  );
};

export default InfoBox;
