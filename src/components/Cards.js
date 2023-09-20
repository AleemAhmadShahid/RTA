import React from "react";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";

const BoxContainer = styled.div`
  position: relative;
  // width:50%;
  // margin-right:10px;
  //  width:90%;
  
`;

const InfoBoxContainer = styled.div`
flex:1;
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
@media screen and (min-width: 768px) {
    /* Adjust width for smaller screens */
    width: 100%;
  }

  /* Add more media queries as needed */

  z-index: 1;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const InfoIcon = styled(AiIcons.AiOutlineInfoCircle)`
  font-size: 24px;
  color: ${(props) => (props.iconColor ? props.iconColor : "#ffa500")};
`;

const InfoNumbers = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const InfoText = styled.div`
  font-size: 14px;
  color: #333; /* Adjust the text color as needed */
`;

const InfoBox = ({ top, iconColor, data, text }) => {
  return (
    <BoxContainer>
       
      <InfoBoxContainer top={top} >
        <div>
          <InfoNumbers>{data}</InfoNumbers>
          <InfoText>{text}</InfoText>
        </div>
        <InfoIcon iconColor={iconColor} />
      </InfoBoxContainer>
      
    </BoxContainer>
  );
};

export default InfoBox;
