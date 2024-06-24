import React, { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { MdOutlineEdit } from "react-icons/md";
import CardsPopup from "../pages/CardsPopup";

import {
 
  AiOutlineEye,
 
} from "react-icons/ai";
import { RxPencil1 } from "react-icons/rx";

const Container = styled.div`
  box-shadow: 5px;
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  position: relative;
  cursor: pointer;
  box-shadow: 0px 1px 0px 0px rgba(0, 0.1, 0, 0.1);
 
   word-wrap: break-word;
  &:hover .edit-button {
    display: block;
  }
  
`;

export const EditButton = styled.button`
  position: absolute;
  top: 4px;

  right: 6px;
  background: none;
  border: none;
  cursor: pointer;

  display: none;
`;

export const OptionsMenu = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  border-radius: 5px;
  padding: 5px;
  margin-top: -35px;
  margin-left: 250px;
  z-index: 1;
  
`;

export const OptionItem = styled.div`
  padding: 5px;
  background-color: white;
  margin-bottom: 5px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: lightgrey;
  }

`;

const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  font-size: 13px;
  position: relative;
`;

const TaskImage = styled.img`
  width: 100%;
  height: 100%;
  margin-right: 10px;
  margin-bottom: 5px;
`;
const TaskImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 5px;
`;

const TaskText = styled.div`
  margin-right: 10px;
  margin-bottom: -2px;
`;

const WatchIcon = styled.div`
  position: relative;
  margin-top: 5px;

  left: 5px;
  bottom: 0;
  float: right;
  font-size: 14px;
`;
const LabelLine=styled.div`
// background-color: ${(props) => props.color || "blue"};
background: #e79f31;
height:8px;
margin-bottom:1px;
width:40px;
border-radius:5px;

`

function Task(props) {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const menuRef = useRef(null);

  const toggleOptionsMenu = () => {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  };

  const openCardPopup = () => {
    setIsCardPopupOpen(true);
  };

  const closeCardPopup = () => {
    setIsCardPopupOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOptionsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function deleteTask(columnId, index, taskId) {
    const column = props.state.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(index, 1);

    const tasks = props.state.tasks;
    const { [taskId]: oldTask, ...newTasks } = tasks;

    props.setState({
      ...props.state,
      tasks: {
        ...newTasks,
        // ...image,
      },
      columns: {
        ...props.state.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });
  }
  const [taskImage, setTaskImage] = useState(null);

  const handleTaskImage = (image) => {
    setTaskImage(image);
  };
  const [isWatched, setIsWatched] = useState(false);

  const handleWatchToggle = (watched) => {
    setIsWatched(watched);
  };

  return (
    <>
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // isOpen={isOptionsMenuOpen}
        >
          <TaskContent>
            <TaskImageContainer>
              {" "}
              {taskImage ? (
                <TaskImage
                  src={URL.createObjectURL(taskImage)}
                  alt="Task Image"
                />
              ) : null}
              

              <LabelLine color={selectedColor} />



              <TaskText >{props.task.content}</TaskText>
            </TaskImageContainer>
            {isWatched && (
              <WatchIcon>
                <AiOutlineEye />
              </WatchIcon>
            )}
          </TaskContent>

          <EditButton
            className="edit-button"
            onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
          >
            <RxPencil1 />
          </EditButton>

          <OptionsMenu isOpen={isOptionsMenuOpen} ref={menuRef}>
            <OptionItem
              onClick={() =>
                deleteTask(props.columnId, props.index, props.task.id)
              }
            >
              Delete
            </OptionItem>
            <OptionItem onClick={openCardPopup}>Open card</OptionItem>
            <OptionItem>Copy</OptionItem>
            <OptionItem>Edit label</OptionItem>
          </OptionsMenu>

          
           {/* <GenericPopup
            onColorChange={(color) => setSelectedColor(color)}
            />  */}

        </Container>
      )}
    </Draggable>{isCardPopupOpen && (
            <CardsPopup
              task={props.task}
              closeCardPopup={closeCardPopup}
              onImageSelect={handleTaskImage}
              onWatchToggle={handleWatchToggle}
              // column={props.column.title}
              // onColorChange={(color) => setSelectedColor(color)}
            />
           
          )} 
          </>
  );
}

export default Task;
