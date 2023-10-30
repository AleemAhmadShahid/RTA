import React, { useState } from "react";
import styled from "styled-components";
import {
  Heading,
  CloseButtonContainer,
  CloseButton,
} from "./styles/MultiStepFormStyling";
import { LeftColumn, RightColumn, ColumnContainer } from "./EmpSetting";
import {
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineDashboard,
  AiOutlinePieChart,
  AiOutlineAppstore,
  AiOutlinePlus,
  AiOutlineEye,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsPerson, BsClock } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { MdContentCopy } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { H6 } from "./ForgetPassword";

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Ensure the pop-up is on top of other content */
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid #f5f5f5;
  background: #f5f5f5;

  @media screen and (max-width: 845px) {
    width: 100%;
  }
`;
const CenterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 45%;
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
  font-size: 13px;
  margin-bottom: 7px;
  font-weight: medium; 
  padding: 5px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: grey;
  }
`;
const TextArea = styled.textarea`
  border-radius: 5px;
  width: 92%;
  padding: 4px;
  margin-left: 40px;
  background: #f5f5f5;
  border: 1px solid #f5f5f5;

  margin-bottom: 5px;
`;


const Icon = styled.span`
  margin-right: 5px;
  margin-left: 5px;
`;
const LeftIcon = styled.span`
  margin-right: 18px;
  margin-left: 5px;
  font-size: 18px;
`;
const Box = styled.div`
  background: white;
  padding: 10px;
  border-radius: 10px;
`;
const Input = styled.input`
  width: 92%;
  padding: 4px;
  margin-left: 40px;
  background: #f5f5f5;
  border: 1px solid #f5f5f5;
  border-radius: 5px;
  margin-bottom: 5px;
`;
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CardsPopup = ({ task, closeCardPopup }) => {
  const [description, setDescription] = useState(task.description);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSaveDescription = () => {
    task.description = description;
  };
  return (
    <PopupOverlay>
      <CenterContainer>
        <Box>
          <HeaderContainer
            style={{
              background: "white",
              border: "none",
              marginBottom: "30px",
            }}
          >
            <Heading style={{ fontWeight: "bold",fontSize:'16px' }}>
              <LeftIcon>
                <AiOutlineAppstore />
              </LeftIcon>
              Card Name{" "}
            </Heading>
            <CloseButtonContainer>
              <CloseButton onClick={closeCardPopup}>&#10005;</CloseButton>
            </CloseButtonContainer>
          </HeaderContainer>

          <ColumnContainer>
            <LeftColumn style={{ flex: "3" }}>
              <H6 style={{ fontWeight: "bold", marginLeft: "40px",fontSize:'12px' }}>
                Notification
              </H6>
              <AddButton style={{ width: "100px", marginLeft: "40px" }}>
                <Icon>
                  <AiOutlineEye />
                </Icon>
                Watch
              </AddButton>
              <H6 style={{ fontWeight: "bold", marginTop: "30px",fontSize:'12px' }}>
                <LeftIcon>
                  <HiMenuAlt2 />
                </LeftIcon>
                Description
              </H6>

              <InputContainer>
                <TextArea
                  value={description}
                  onChange={handleDescriptionChange}
                  rows="4"
                />
              </InputContainer>
              <AddButton
                style={{ width: "100px", marginLeft: "40px" }}
                onClick={handleSaveDescription}
              >
                Save{" "}
              </AddButton>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <H6 style={{ fontWeight: "bold", marginTop: "30px",fontSize:'12px' }}>
                  {" "}
                  <LeftIcon>
                    <AiOutlineBell />
                  </LeftIcon>
                  Activity
                </H6>
                <AddButton
                  style={{ width: "100px", height: "30px", marginTop: "30px" }}
                >
                  Show Details
                </AddButton>
              </div>
              <InputContainer>
                <Input type="text" />
              </InputContainer>
            </LeftColumn>
            <RightColumn>
              <H6 style={{fontWeight: "bold",fontSize:'12px'}}>Add to card</H6>
              <AddButton>
                <Icon>
                  <BsPerson />
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
                  <AiOutlineBell />
                </Icon>
                Checklist
              </AddButton>
              <AddButton>
                <Icon>
                  <BsClock />
                </Icon>
                Date
              </AddButton>
              <AddButton>
                <Icon>
                  <GrAttachment />
                </Icon>
                Attachment
              </AddButton>

              <AddButton>
                <Icon>
                  <AiOutlineAppstore />
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
              <AddButton style={{ background: "white" }}>
                <Icon>
                  <AiOutlinePlus />
                </Icon>
                Add Power-Ups
              </AddButton>
              <t>Automation</t>
              <AddButton style={{ background: "white" }}>
                <Icon>
                  <AiOutlinePlus />
                </Icon>
                Add Button
              </AddButton>
              <AddButton>
                <Icon>
                  <AiOutlineArrowRight />
                </Icon>
                Move
              </AddButton>
              <AddButton>
                <Icon>
                  <MdContentCopy />
                </Icon>
                Copy
              </AddButton>
              <AddButton>
                <Icon>
                  <AiOutlineMail />
                </Icon>
                Attachment
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
    </PopupOverlay>
  );
};

export default CardsPopup;
