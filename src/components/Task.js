import React, { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { MdOutlineEdit} from "react-icons/md";
import CardsPopup from "../pages/CardsPopup";

const Container = styled.div`
  box-shadow: 5px;
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  position: relative;
  cursor: pointer;
  box-shadow: 0px 1px 2px 1px rgba(1, 0, 0, 0.2);

  &:hover .edit-button {
    display: block;
  }
`;

export const EditButton = styled.button`
  position: absolute;
   top: 4px;
  // width: 30px;
  // height: 30px;
  right: 6px;
  background: none;
  border: none;
  // border-radius: 50%;
  // background:white;
  cursor: pointer;
  
  display: none;
`;

export const OptionsMenu = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  width: auto;
  border-radius: 5px;
  padding: 5px;
  margin-top: -35px;
  margin-left: 210px;
  z-index: 1;
`;

export const OptionItem = styled.div`
  padding: 5px;
  background-color: white;
  margin-bottom: 5px;
  border-radius: 5px;

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
  font-size: 12px;
`;

const TaskImage = styled.img`
  width: 100%;
  height: 100%;
  margin-right: 10px;
  margin-bottom:5px;
`;
const TaskImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 5px; 
`;

const TaskText = styled.div`
  margin-right: 10px;
  margin-bottom:-2px;
`;

function Task(props) {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
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
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <TaskContent>
            <TaskImageContainer>
              {taskImage ? (
                <TaskImage src={URL.createObjectURL(taskImage)} alt="Task Image" />
              ) : null}
              <TaskText>{props.task.content}</TaskText>
            </TaskImageContainer>
          </TaskContent>

          <EditButton className="edit-button" onClick={toggleOptionsMenu}>
            <MdOutlineEdit />
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
          </OptionsMenu>
          {isCardPopupOpen && (
            <CardsPopup
              task={props.task}
              closeCardPopup={closeCardPopup}
              onImageSelect={handleTaskImage}
            />
          )}
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
