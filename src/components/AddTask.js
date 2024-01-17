import React, { useState } from 'react';
import styled from 'styled-components';
import Task from './Task';
import { IoCloseOutline } from "react-icons/io5";
export const Input = styled.input`
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  font-size: 13px;
   line-height: 26px; 
   border:none;
   &:focus {
    outline: none;
  }
`;
const Taskinput = styled.div`
width: 100%;
padding: 10px;
border: 1px solid #ccc;
border-radius: 8px;
min-height: 70px;
font-size: 14px;
outline: none;
background-color:white;
&:focus {
  border-color: blue;
}
`;


export const AddButton = styled.button`
  width: 100%;
  border: none;
  text-align: left;
  padding: 7px;
  border-radius: 10px;
  transition: background-color 0.3s ease;
// color:white;
  &:hover {
    background-color:#cfd0cf;
  }
  font-size:13.5px;
  font-weight:bold;
`;

export const AddTaskButton = styled.button`
  width: 35%;
  border: none;
  text-align: center;
   margin-top: 8px;
  padding: 6px;
  border-radius: 5px;
  background-color: #ffa500;
  color:white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8000;
  }
  font-size:13.5px;
  // font-weight:300;
`;
 
export const CloseButton = styled.button`
 
  width:30px;
 
  background-color: #f5f5f5;
  color: black;
  border: none;
  text-align: center;
  justify-content:center;
  border-radius: 5px;
  font-size: 22px;
  cursor: pointer;
  margin-left: 5px;
 
`;

export const ImageInput = styled.input`
  display: none;
`;

function AddTask(props) {
  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [value, setValue] = useState('');
   const [image, setImage] = useState(null);

  function onNewTaskButtonClick() {
    setShowNewTaskButton(false);
  }

  function handleInputChange(event) {
    setValue(event.target.value);
  }

  function onNewTaskInputComplete() {
    if (value.trim() !== '') {
      addNewTask(props.columnId, value);
      // props.onTaskAdded(value);
      setValue('');
     
      setShowNewTaskButton(true);
    }
  }

  function addNewTask(columnId, content) {
    const newTaskId = 'task-' + Math.floor(Math.random() * 100000);

    const column = props.state.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(newTaskId);

    const newTask = {
      id: newTaskId,
      content: content,
      
    };

    props.setState({
      ...props.state,
      tasks: {
        ...props.state.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...props.state.columns,
        [columnId]: {
          ...props.state.columns[columnId],
          taskIds: newTaskIds,
        },
      },
    });
  }

  return (
    <div>
      {showNewTaskButton ? (
        <AddButton onClick={onNewTaskButtonClick}>+ Add a card</AddButton>
      ) : (
        <div>
          <Taskinput
            contentEditable="true"
            placeholder="Type your text here..."
            type="text"
            value={value}
            onChange={handleInputChange}
            onBlur={onNewTaskInputComplete}
          />
          
          <AddTaskButton onClick={onNewTaskInputComplete}>Add Card</AddTaskButton>
          <CloseButton onClick={() => setShowNewTaskButton(true)}><IoCloseOutline /></CloseButton>
          
        </div>
      )}
    </div>
  );
}

export default AddTask;
