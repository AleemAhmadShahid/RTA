import React from "react";
import styled from "styled-components";

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

  margin-bottom: 20px;
  width: 100%;

  @media screen and (max-width: 1200px) {
    width: 80%;
  }
  @media screen and (max-width: 845px) {
    width: 100%;
  }

  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
`;

const InfoIcon = styled.div`
  font-size: 18px;
  color: ${(props) => (props.iconColor ? props.iconColor : "#ffa500")};
  border: 0px solid
    ${(props) => (props.iconColor ? props.iconColor : "#ffa500")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 39px;
  height: 39px;
  background-color: ${(props) =>
    props.iconColor ? `${props.iconColor}30` : "grey"};
  margin-right: 1px;
`;

const InfoNumbers = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const InfoText = styled.div`
  font-size: 14px;
  color: #333;
`;

const InfoBox = ({ top, icon: Icon, iconColor, data, text }) => {
  return (
    <BoxContainer>
      <InfoBoxContainer top={top}>
        <div>
          <InfoNumbers>{data}</InfoNumbers>
          <InfoText>{text}</InfoText>
        </div>
       
        <InfoIcon iconColor={iconColor}>
          <Icon />
        </InfoIcon>
      </InfoBoxContainer>
    </BoxContainer>
  );
};

export default InfoBox;
