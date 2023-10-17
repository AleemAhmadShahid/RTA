import React from "react";
import styled from "styled-components";
import { LeftColumn, RightColumn, ColumnContainer } from "./EmpSetting";
import {
  AiOutlineBell,
  AiOutlineSetting,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineMail,
  AiOutlineFileText,
  AiOutlineSearch,
  AiOutlineDashboard,
  AiOutlinePieChart,
  AiOutlineAppstore,
  AiOutlineLogout,
  AiOutlineMenu,
} from "react-icons/ai";

const CenterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 50%;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);

  @media (max-width: 845px) {
    width: 100%;
  }
  z-index: 20;
`;

const AddButton = styled.button`
  width: 100%;
  border: none;
  display: flex; 
  align-items: center; 
  text-align: left;
  font-size:14px;
  margin-bottom: 5px;
  padding: 4px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: grey;
  }
`;

const Icon = styled.span`
  margin-right: 5px; 
  margin-left:5px;
`;

const Box = styled.div`
  background: white;
  padding: 10px;
  border-radius: 5px;
`;

const CardsPopup = () => {
  return (
    <CenterContainer>
      <Box>
        <h5 style={{ fontWeight: "bold" }}>Card Name</h5>
        <decription>in list Done</decription>
        <ColumnContainer>
          <LeftColumn style={{ flex: "3" }}>
            <h6>my name is aleem</h6>
          </LeftColumn>
          <RightColumn>
            <h6>shaheer is gay</h6>
            <AddButton>
              <Icon>
                <AiOutlineBell />
              </Icon>
              Member
            </AddButton>
            <AddButton>
              <Icon>
                <AiOutlineDashboard />
              </Icon>
              Labels
            </AddButton>
            <AddButton>
              <Icon>
                < AiOutlineAppstore />
              </Icon>
              Checklist
            </AddButton>
            <AddButton>
              <Icon>
                <AiOutlineBell />
              </Icon>
              Attachment
            </AddButton>
            <AddButton>
              <Icon>
                < AiOutlineAppstore />
              </Icon>
              Cover
            </AddButton>
            <AddButton>
              <Icon>
                <AiOutlineBell />
              </Icon>
              Custom Fields
            </AddButton>
            <t>Power-Ups</t>
            <AddButton>
              <Icon>
                <AiOutlineMail/>
              </Icon>
              + Add Power-Ups
            </AddButton>
            <t>Power-Ups</t>
            <AddButton>
              <Icon>
                <AiOutlineBell />
              </Icon>
              + Add Power-Ups
            </AddButton>
            <AddButton>
              <Icon>
                <AiOutlineBell />
              </Icon>
              Labels
            </AddButton>
            <AddButton>
              <Icon>
                <AiOutlinePieChart />
              </Icon>
              Checklist
            </AddButton>
            <AddButton>
              <Icon>
                <AiOutlineMail />
              </Icon>
              Attachment
            </AddButton>
            <AddButton>
              <Icon>
                <AiOutlineBell />
              </Icon>
              Cover
            </AddButton>
            <AddButton>
              <Icon>
                <AiOutlinePieChart />
              </Icon>
              Custom Fields
            </AddButton>
          </RightColumn>
        </ColumnContainer>
      </Box>
    </CenterContainer>
  );
};

export default CardsPopup;
