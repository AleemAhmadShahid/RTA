import React, { useState, useEffect, useRef } from "react";
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { MdModeEditOutline } from 'react-icons/md';
import CardsPopup from "../pages/CardsPopup";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  position: relative;
  cursor: pointer; 

 
  &:hover .edit-button {
    display: block;
  }
`;

export const EditButton = styled.button`
  position: absolute;
  top: 5px;
  right: 6px;
  background: none;
  border: none;
  cursor: pointer;
  display: none; 
`;

export const OptionsMenu = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 20px;
  right: 0;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 5px;
  z-index: 1;
`;

export const OptionItem = styled.div`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: lightgrey;
  }
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
  

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        {props.task.content}
         <EditButton className="edit-button" onClick={toggleOptionsMenu}>
          <MdModeEditOutline />
        </EditButton>
        <OptionsMenu isOpen={isOptionsMenuOpen} ref={menuRef}>
          <OptionItem onClick={() => deleteTask(props.columnId, props.index, props.task.id)}>Delete</OptionItem>
          <OptionItem onClick={openCardPopup}>Open card</OptionItem>
        </OptionsMenu> 
        {isCardPopupOpen && (
            <CardsPopup task={props.task} closeCardPopup={closeCardPopup} />
          )}
      </Container>
      
      )}
    </Draggable>
  );
}

export default Task;
