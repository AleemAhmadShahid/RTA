import React, { useState } from 'react';
import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 5px;
  border-radius: 5px;
`;

export const AddButton = styled.button`
  width: 100%;
  border: none;
  text-align: left;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: grey;
  }
`;

export const AddTaskButton = styled.button`
  width: 40%;
  border: none;
  text-align: center;
  margin-top: 8px;
  padding: 10px;
  border-radius: 5px;
  background-color: #ffa500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8000;
  }
`;

export const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
`;

function AddTask(props) {
  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [value, setValue] = useState('');

  function onNewTaskButtonClick() {
    setShowNewTaskButton(false);
  }

  function handleInputChange(event) {
    setValue(event.target.value);
  }

  function onNewTaskInputComplete() {
    if (value.trim() !== '') {
      addNewTask(props.columnId, value);
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
        <AddButton onClick={onNewTaskButtonClick}>+ Add a card
       </AddButton>
      ) : (
        <div>
          <Input
            type="text"
            value={value}
            onChange={handleInputChange}
            onBlur={onNewTaskInputComplete}
          />
          <AddTaskButton>Add Card</AddTaskButton>
          <CloseButton onClick={() => setShowNewTaskButton(true)}>X</CloseButton>
        </div>
      )}
    </div>
  );
}

export default AddTask;
