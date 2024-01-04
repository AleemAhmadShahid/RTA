import React, { useState, useRef } from "react";
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
import GenericPopup from "./GenericPopup";

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  // align-items: center;
  z-index: 999;
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid #f5f5f5;
  // background: #f5f5f5;

  @media screen and (max-width: 845px) {
    width: 100%;
  }
  background-color: #f1f2f4;
`;
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

export const AddButton = styled.button`
  width: 100%;
  border: none;
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 7px;
  background-color: #e5e7ec;
  color: #172b4d;
  font-weight: medium;
  padding: 5px;
  border-radius: 3px;
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
  background: white;
  border: 1px solid #172b4d;

  margin-bottom: 5px;
`;

const Icon = styled.span`
  margin-right: 10px;
  margin-left: 5px;
  font-size: 14px;
  color: #42526e;
`;
const LeftIcon = styled.span`
  margin-right: 18px;
  margin-left: 5px;
  font-size: 20px;
  color: #42526e;
`;
const Box = styled.div`
  background-color: #f1f2f4;
  padding: 10px;
  border-radius: 10px;
`;
const Input = styled.input`
  width: 92%;
  padding: 4px;
  margin-left: 40px;
  background: white;
  border: 0.1px solid lightgrey;
  border-radius: 10px;
  margin-bottom: 5px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
`;
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const SubBox = styled.div`
  background: orange;
`;

const CardsPopup = ({
  task,
  closeCardPopup,
  onImageSelect,
  onSaveImage,
  onWatchToggle,
  headingName,
}) => {
  const fileInputRef = useRef(null);
  const [description, setDescription] = useState(task.description);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMemberPopupOpen, setIsMemberPopupOpen] = useState(false);
  const [isLabelPopupOpen, setIsLabelPopupOpen] = useState(false);
  const [memberFormValues, setMemberFormValues] = useState({});
  const [boxPosition, setBoxPosition] = useState({ left: 0, top: 0 });

  const openMemberPopup = (event) => {
    const clickedDiv = event.currentTarget;
    const rect = clickedDiv.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;

    setBoxPosition({ left, top });
    console.log(left, top);

    setIsMemberPopupOpen(true);
  };
  const closeMemberPopup = () => {
    setIsMemberPopupOpen(false);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const openLabelPopup = (event) => {
    const clickedDiv = event.currentTarget;
    const rect = clickedDiv.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;

    setBoxPosition({ left, top });
    console.log(left, top);

    setIsLabelPopupOpen(true);
  };
  const closeLabelPopup = () => {
    setIsLabelPopupOpen(false);
  };

  

  const handleSaveDescription = () => {
    task.description = description;
  };
  const [isWatched, setIsWatched] = useState(false);

  const handleWatchClick = () => {
    setIsWatched(!isWatched);
    onWatchToggle(!isWatched);
  };

  const handleImageSelection = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
    onImageSelect(image);
    // onSaveImage(image);
  };

  return (
    <PopupOverlay>
      <CenterContainer>
        <Box>
          <HeaderContainer
            style={{
              background: "#f1f2f4",
              border: "none",
              marginBottom: "40px",
            }}
          >
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Image"
                style={{
                  width: "100%",
                  height: "auto",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              />
            )}
            <Heading style={{ fontWeight: "bold", fontSize: "16px" }}>
              <LeftIcon>
                <AiOutlineAppstore />
              </LeftIcon>
              {headingName}
              {/* <H6>in list</H6> */}
            </Heading>

            <CloseButtonContainer>
              <CloseButton onClick={closeCardPopup}>&#10005;</CloseButton>
            </CloseButtonContainer>
          </HeaderContainer>

          <ColumnContainer>
            <LeftColumn style={{ flex: "3" }}>
              <H6
                style={{
                  fontWeight: " 600",
                  marginLeft: "40px",
                  fontSize: "12px",
                  color: "#172b4d",
                }}
              >
                Notification
              </H6>
              <AddButton
                style={{ width: "100px", marginLeft: "40px", color: "#172b4d" }}
                onClick={handleWatchClick}
              >
                <Icon>
                  <AiOutlineEye />
                </Icon>
                Watch
              </AddButton>
              <H6
                style={{
                  fontWeight: "bold",
                  marginTop: "30px",
                  fontSize: "16px",
                  color: "#172b4d",
                }}
              >
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
                <H6
                  style={{
                    fontWeight: "bold",
                    marginTop: "30px",
                    fontSize: "16px",
                    color: "#172b4d",
                  }}
                >
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
              <H6
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "#172b4d",
                }}
              >
                Add to card
              </H6>
              <AddButton onClick={openMemberPopup}>
                <Icon>
                  <BsPerson />
                </Icon>
                Member
              </AddButton>         

              <AddButton onClick={openLabelPopup}>
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
              <AddButton
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              >
                <Icon>
                  <GrAttachment />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageSelection}
                  />
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
      {isMemberPopupOpen && (
        <GenericPopup
          left={boxPosition.left}
          top={boxPosition.top}
          // heading={}
          fields={[
            {
              name: "Members ",
              type: "text",
              placeholder: "Enter member name",
            },
            // Add other fields as needed
          ]}
          onClose={closeMemberPopup}
          // onSubmit={(formValues) => {
          //   console.log("Member form submitted:", formValues);
          // }}
          buttonText="Show Other Workspace Members"
        />
      )}
      {isLabelPopupOpen && (
        <GenericPopup
          left={boxPosition.left}
          top={boxPosition.top}
          // heading={}
          fields={[
            {
              
              name: "Label",
              type: "text",
              placeholder: "Enter label name",
            },
            // Add other fields as needed
          ]}
          onClose={closeLabelPopup}
          // onSubmit={(formValues) => {
          //   console.log("Member form submitted:", formValues);
          // }}
          buttonText="Add Member"
        />
      )}
    </PopupOverlay>
  );
};

export default CardsPopup;
