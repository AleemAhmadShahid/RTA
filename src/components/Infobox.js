import React from "react";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";

const BoxContainer = styled.div`
  position: relative;
`;

const InfoBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 14px 20px;
  border-radius: 5px;
  margin-right: 100px;
  margin-bottom:20px;

  /* Remove the position: absolute */
  width: 100%;
 
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
