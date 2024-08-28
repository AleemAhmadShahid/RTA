import React, { useState, useRef } from "react";
import styled from "styled-components";
import { UserImage } from "../components/EmployeeInfo";
import {
  Heading,
  CloseButtonContainer,
  CloseButton,
} from "../styles/MultiStepFormStyling";
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
import GenericPopup from "../components/GenericPopup";
import Progressbar from "../components/ProgressBar";
import { TbCheckbox } from "react-icons/tb";
import { createPostRequest } from "../global/requests";
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
 
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  z-index: 999;
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid #f5f5f5;
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
min-width: 800px;
  @media (max-width: 945px) {
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
  font-size: 14px;
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
export const TextArea = styled.textarea`
  border-radius: 5px;
  width: 92%;
  padding: 4px;
  margin-left: 45px;
  background: white;
  border: 1px solid #172b4d;

  margin-bottom: 5px;
`;

export const Icon = styled.span`
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
const ColorContainer = styled.div`
  width: 50px;
  border: none;
  display: flex;
  align-items: center;
  text-align: left;
  margin-bottom: 7px;
  background-color: ${(props) => props.color || "transparent"};
  border-radius: 3px;
`;

const CardsPopup = ({
  task = {},
  closeCardPopup,
  onImageSelect,
  title,
  onSaveImage,
  onWatchToggle,
  column,
  // props,
}) => {
  
  
  const fileInputRef = useRef(null);
  const [description, setDescription] = useState(task.description || '');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMemberPopupOpen, setIsMemberPopupOpen] = useState(false);
  const [isLabelPopupOpen, setIsLabelPopupOpen] = useState(false);
  const [isCheckListPopupOpen, setIsCheckListPopupOpen] = useState(false);
  const [isDatePopupOpen, setIsDatePopupOpen] = useState(false);
  const [isAttachmentPopupOpen, setIsAttachmentPopupOpen] = useState(false);
  const [isCoverPopupOpen, setIsCoverPopupOpen] = useState(false);
  const [isMovePopupOpen, setIsMovePopupOpen] = useState(false);
  const [isCopyPopupOpen, setIsCopyPopupOpen] = useState(false);
  const [memberFormValues, setMemberFormValues] = useState({});
  const [boxPosition, setBoxPosition] = useState({ left: 0, top: 0 });
  const [isEditable, setIsEditable] = useState(false);

  const [assignedMembers, setAssignedMembers] = useState([]);
  const openMemberPopup = (event) => {
    const clickedDiv = event.currentTarget;
    const rect = clickedDiv.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;

    setBoxPosition({ left, top });
    console.log(left, top);

    setIsMemberPopupOpen(true);
    setIsLabelPopupOpen(false);
    setIsCheckListPopupOpen(false);
  };
  const closeMemberPopup = () => {
    setIsMemberPopupOpen(false);
  };
  
  
  const [membersList, setMembersList] = useState([]);
  // const [formValues, setFormValues] = useState([]);
  

const handleAddMember = async ( memberName) => {
  console.log(memberName);

  const newMember = {
    assignedMembers: memberName,
  };

  try {
    
      const url = `/api/card/66bda1864714a0f5b5a922c5/66c3113f0ffd306926298331`; 
      const response = await createPostRequest({newMember}, url);
      // console.log(newMember);

      if (response.status === 200 || response.status === 201) {
          console.log('Member added successfully');
          setMembersList(prevMembers => [...prevMembers, newMember]);
      } else {
          console.error('Failed to add member');
          
      }
  } catch (error) {
      console.error('Error adding member:', error);
  }
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
    setIsCheckListPopupOpen(false);
  };
  const closeLabelPopup = () => {
    setIsLabelPopupOpen(false);
  };
  //checklist

  
  const [showDiv, setShowDiv] = useState(false);
  const handleChecklistButtonClick = (value) => {
    setShowDiv(value);
  };
  const openCheckListPopup = (event) => {
    const clickedDiv = event.currentTarget;
    const rect = clickedDiv.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;

    setBoxPosition({ left, top });
    console.log(left, top);

    setIsCheckListPopupOpen(true);
    setIsLabelPopupOpen(false);
  };
  const closeCheckListPopup = () => {
    setIsCheckListPopupOpen(false);
  };
  const saveTaskDescription = async (taskId, newDescription) => {
    try {
      console.log(`Saving description for task ID: ${taskId}`);
      
      console.log(task);
      const url = `/api/card/66c30f8f0ffd306926298313/${taskId}`;
  
     
      const response = await createPostRequest({ description: newDescription }, url);
      
   
      if(response.status!=200){
        console.error('Faild to add description to the backend');
        
      }
  
      }
      catch(error){
        console.error('Error Adding  description:',error);
      }
  };
  
  const handleSaveDescription = () => {
    saveTaskDescription(task.taskId, description);
    // console.log(description);
    // console.log(task.id);

    setIsEditable(false);
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
  const handleInputContainerClick = () => {
    setIsEditable(true);
  };

  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorChange = (color) => {
    // Update the state with the selected color
    setSelectedColor(color);
  };

  //for date

  const openDatePopup = (event) => {
    const clickedDiv = event.currentTarget;
    const rect = clickedDiv.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;

    setBoxPosition({ left, top });
    console.log(left, top);

    setIsDatePopupOpen(true);
  };
  const closeDatePopup = () => {
    setIsDatePopupOpen(false);
  };

  //for attachment
  const openAttachmentPopup = (event) => {
    const clickedDiv = event.currentTarget;
    const rect = clickedDiv.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;

    setBoxPosition({ left, top });
    console.log(left, top);

    setIsAttachmentPopupOpen(true);
  };
  const closeAttachmentPopup = () => {
    setIsAttachmentPopupOpen(false);
  };

  //for cover
  const openCoverPopup = (event) => {
    const clickedDiv = event.currentTarget;
    const rect = clickedDiv.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;

    setBoxPosition({ left, top });
    console.log(left, top);

    setIsCoverPopupOpen(true);
  };
  const closeCoverPopup = () => {
    setIsCoverPopupOpen(false);
  };
  //for move

  const openMovePopup = (event) => {
    const clickedDiv = event.currentTarget;
    const rect = clickedDiv.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;

    setBoxPosition({ left, top });
    console.log(left, top);

    setIsMovePopupOpen(true);
  };
  const closeMovePopup = () => {
    setIsMovePopupOpen(false);
  };

  //for copy
  const openCopyPopup = (event) => {
    const clickedDiv = event.currentTarget;
    const rect = clickedDiv.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;

    setBoxPosition({ left, top });
    console.log(left, top);

    setIsCopyPopupOpen(true);
  };
  const closeCopyPopup = () => {
    setIsCopyPopupOpen(false);
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
              {task.title}
              {/* <div>{ column.name }</div> */}
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
              <div style={{ marginLeft: "40px", display: "flex" }}>
                <AddButton
                  style={{
                    width: "100px",
                    marginRight: "20px",
                    color: "#172b4d",
                  }}
                  onClick={handleWatchClick}
                >
                  <Icon>
                    <AiOutlineEye />
                  </Icon>
                  Watch
                </AddButton>

                <ColorContainer color={selectedColor} />
              </div>
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

              <InputContainer onClick={handleInputContainerClick}>
                <TextArea
                  value={description}
                  onChange={handleDescriptionChange}
                  // onBlur={() => saveDescription(description)}
                  rows="4"
                />
              </InputContainer>
              <div style={{ display: "flex" }}>
                <AddButton
                  style={{
                    width: "50px",
                    marginLeft: "45px",
                    backgroundColor: "#0096FF",
                    color: "white",
                    textAlign: "center",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={handleSaveDescription}
                >
                  Save{" "}
                </AddButton>

                <AddButton
                  style={{
                    width: "50px",
                    marginLeft: "10px",
                    backgroundColor: " #f1f2f4",
                    textAlign: "center",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Cancel{" "}
                </AddButton>
              </div>
              {/* checklist */}

              {showDiv && ( 
                <div>
                  {/* Checklist header */}
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <H6
                      style={{
                        fontWeight: "bold",
                        marginTop: "30px",
                        fontSize: "16px",
                        color: "#172b4d",
                      }}
                    >
                      {" "}
                      <LeftIcon style={{ marginRight: "20px" }}>
                        <TbCheckbox />
                      </LeftIcon>
                      CheckList
                    </H6>
                
                    <AddButton
                      style={{
                        width: "60px",
                        height: "30px",
                        marginTop: "30px",
                      }}
                    >
                      Delete
                    </AddButton>
                  </div>
                  {/* Progress bar */}
                  <div style={{ display: "flex" }}>
                    <LeftIcon style={{ marginRight: "20px" }}>
                      {/* <ProgressBarPercent/> */}
                    </LeftIcon>
                    <div style={{ width: "100%" }}>
                      <Progressbar />
                    </div>
                  </div>
                  
                  <div style={{ display: "flex" }}>
                    <input
                      style={{ marginLeft: "10px" }}
                      type="checkbox"
                    ></input>
                    <InputContainer>
                      <Input
                        style={{ marginLeft: "25px", width: "95%" }}
                        type="text"
                      />
                    </InputContainer>
                  </div>
                  
                  <AddButton
                    style={{
                      marginLeft: "45px",
                      width: "100px",
                      height: "30px",
                    }}
                  >
                    Add an Item
                  </AddButton>
                  
                  <GenericPopup onAddButtonClick={handleChecklistButtonClick} />
                </div>
              )}

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
                  <LeftIcon style={{ marginRight: "20px" }}>
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
              <div style={{ display: "flex" }}>
                <UserImage
                  // src={employee.profileImg || defaultImageUrl}
                  alt="Profile Image"
                  style={{ marginLeft: "0px" }}
                />
                <InputContainer style={{ marginLeft: "-30px" }}>
                  <Input type="text" />
                </InputContainer>
              </div>
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
              <AddButton onClick={openCheckListPopup}>
                <Icon>
                  <AiOutlineBell />
                </Icon>
                Checklist
              </AddButton>
              <AddButton onClick={openDatePopup}>
                <Icon>
                  <BsClock />
                </Icon>
                Date
              </AddButton>
              <AddButton onClick={openAttachmentPopup}>
                <Icon>
                  <GrAttachment />
                </Icon>
                Attachment
              </AddButton>

              <AddButton onClick={openCoverPopup}>
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
              <AddButton>
                <Icon>
                  <AiOutlinePlus />
                </Icon>
                Add Power-Ups
              </AddButton>
              <t>Automation</t>
              <AddButton>
                <Icon>
                  <AiOutlinePlus />
                </Icon>
                Add Button
              </AddButton>
              <AddButton onClick={openMovePopup}>
                <Icon>
                  <AiOutlineArrowRight />
                </Icon>
                Move
              </AddButton>
              <AddButton onClick={openCopyPopup}>
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
              name: "Members",
              type: "text",
              placeholder: "Enter member name",
            },
            // Add other fields as needed
          ]}
          onClose={closeMemberPopup}
          // formValues={formValues}
          // buttonText="Show Other Workspace Members"
          onSubmit={(memberName) => handleAddMember(memberName)}
          buttonText="Add Members"
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
          onColorChange={handleColorChange}
          buttonText="Add "
        />
      )}
      {isCheckListPopupOpen && (
        <GenericPopup
          left={boxPosition.left}
          top={boxPosition.top}
          // heading={}
          fields={[
            {
              name: "Checklist",
              type: "text",
              placeholder: "Checklist",
            },
            // Add other fields as needed
          ]}
          onClose={closeCheckListPopup}
          buttonText="Add "
        />
      )}
      {isDatePopupOpen && (
        <GenericPopup
          left={boxPosition.left}
          fields={[
            {
              name: "Date",
              type: "text",
              placeholder: "Dates",
            },
          ]}
          onClose={closeDatePopup}
          buttonText="Add "
        />
      )}
      {isAttachmentPopupOpen && (
        <GenericPopup
          left={boxPosition.left}
          fields={[
            {
              name: "Attachment",
              type: "text",
              placeholder: "Dates",
            },
          ]}
          onClose={closeAttachmentPopup}
          buttonText="Add "
        />
      )}
      {isCoverPopupOpen && (
        <GenericPopup
          left={boxPosition.left}
          top={boxPosition.top}
          // heading={}
          fields={[
            {
              name: "Cover",
              type: "text",
              placeholder: "Dates",
            },
            // Add other fields as needed
          ]}
          onClose={closeCoverPopup}
          // onSubmit={(formValues) => {
          //   console.log("Member form submitted:", formValues);
          // }}
          buttonText="Add "
        />
      )}

      {isMovePopupOpen && (
        <GenericPopup
          left={boxPosition.left}
          top={boxPosition.top-100}
          // heading={}
          fields={[
            {
              name: "Move",
              type: "text",
              placeholder: "Dates",
            },
            // Add other fields as needed
          ]}
          onClose={closeMovePopup}
          // onSubmit={(formValues) => {
          //   console.log("Member form submitted:", formValues);
          // }}
          buttonText="Add "
        />
      )}
      {isCopyPopupOpen && (
        <GenericPopup
          left={boxPosition.left}
          top={boxPosition.top-100}
          // heading={}
          fields={[
            {
              name: "Copy",
              type: "text",
              placeholder: "Dates",
            },
            // Add other fields as needed
          ]}
          onClose={closeCopyPopup}
          // onSubmit={(formValues) => {
          //   console.log("Member form submitted:", formValues);
          // }}
          buttonText="Add "
        />
      )}
    </PopupOverlay>
  );
};

export default CardsPopup;
