import React, { useState } from 'react';
import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  font-size: 12px;
   line-height: 22px; 
`;


export const AddButton = styled.button`
  width: 100%;
  border: none;
  text-align: left;
  padding: 7px;
  border-radius: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: grey;
  }
  font-size:12px;
  font-weight:bold;
`;

export const AddTaskButton = styled.button`
  width: 35%;
  border: none;
  text-align: center;
  margin-top: 8px;
  padding: 7px;
  border-radius: 10px;
  background-color: #ffa500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8000;
  }
  font-size:12px;
`;

export const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: #f5f5f5;
  color: black;
  border: none;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
`;

export const ImageInput = styled.input`
  display: none;
`;

function AddTask(props) {
  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [value, setValue] = useState('');
  // const [image, setImage] = useState(null);

  function onNewTaskButtonClick() {
    setShowNewTaskButton(false);
  }

  function handleInputChange(event) {
    setValue(event.target.value);
  }

  // function handleImageChange(event) {
  //   const selectedImage = event.target.files[0];
  //   setImage(selectedImage);
  // }

  function onNewTaskInputComplete() {
    if (value.trim() !== '') {
      addNewTask(props.columnId, value);
      setValue('');
      // setImage(null);
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
      // image: image, // Store the image in the task
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
          <Input
            type="text"
            value={value}
            onChange={handleInputChange}
            onBlur={onNewTaskInputComplete}
            placeholder="Enter a title for the task"
          />
          {/* <label>
            <ImageInput type="file" onChange={handleImageChange} />
            <AddTaskButton>Upload Image</AddTaskButton>
          </label> */}
          {/* {image && <p>Image selected: {image.name}</p>} */}
          <AddTaskButton onClick={onNewTaskInputComplete}>Add Card</AddTaskButton>
          <CloseButton onClick={() => setShowNewTaskButton(true)}>X</CloseButton>
        </div>
      )}
    </div>
  );
}

export default AddTask;
