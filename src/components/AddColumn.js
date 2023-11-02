import React, { useState } from "react";
import styled from "styled-components";
import { Input,CloseButton,AddTaskButton } from "./AddTask";

const FormButton = styled.button`
  background-color: lightgray;
  color: #fff;
  border: none;
  border-radius: 10px;

  width: 230px;
  text-align:left;
  padding: 10px; 
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: grey;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

   width: 240px;


`;



function AddColumn(props) {
  const [showNewColumnButton, setShowNewColumnButton] = useState(true);
  const [value, setValue] = useState("");

  function handleInputChange(event) {
    setValue(event.target.value);
  }

  function onNewColumnButtonClick() {
    setShowNewColumnButton(!showNewColumnButton); 
    setValue(""); 
  }

  function onNewColumnInputComplete() {
    if (value.trim() !== "") {
      addNewColumn(value);
      setValue("");
    }
    setShowNewColumnButton(true); 
  }

  function addNewColumn(title) {
    const newColumnOrder = Array.from(props.state.columnOrder);
    const newColumnId = "column-" + Math.floor(Math.random() * 100000);
    newColumnOrder.push(newColumnId);

    const newColumn = {
      id: newColumnId,
      title: title,
      taskIds: [],
    };

    props.setState({
      ...props.state,
      columnOrder: newColumnOrder,
      columns: {
        ...props.state.columns,
        [newColumnId]: newColumn,
      },
    });
  }

  return (
    <Container>
      {showNewColumnButton ? (
        <FormButton onClick={onNewColumnButtonClick}>+Add a list</FormButton>
      ) : (
        <div>
          <Input style={{marginTop:'10px'}} type="text" value={value} onChange={handleInputChange} onBlur={onNewColumnInputComplete} />
          <div>
            <AddTaskButton onClick={onNewColumnInputComplete}>Add</AddTaskButton>
            <CloseButton onClick={onNewColumnButtonClick}>X</CloseButton>
          </div>
        </div>
      )}
    </Container>
  );
}

export default AddColumn;
