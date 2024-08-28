import React, { useState } from "react";
import styled from "styled-components";
import { Input, CloseButton, AddTaskButton } from "./AddTask";
import { IoCloseOutline } from "react-icons/io5";
import { createPostRequest } from "../global/requests";
const FormButton = styled.button`
  background-color: lightgray;
  color: #fff;
  border: none;
  border-radius: 10px;

  width: 270px;
  text-align: left;
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

  width: 270px;
`;
const Container1 = styled.div`
  //  background-color:white;
  background: #f1f2f4;
  padding: 5px;
  border-radius: 10px;
`;
const useEnterKeyPress = (callback) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  return handleKeyPress;
};
function AddColumn(props) {
  const [showNewColumnButton, setShowNewColumnButton] = useState(true);
  const handleEnterKeyPress = useEnterKeyPress(onNewColumnInputComplete);
  const [value, setValue] = useState("");

  function handleInputChange(event) {
    setValue(event.target.value);
  }

  function onNewColumnButtonClick() {
    setShowNewColumnButton(!showNewColumnButton);
    setValue("");
  }

 async function onNewColumnInputComplete() {
    if (value.trim() !== "") {
      await addNewColumn(value);
      setValue("");
    }
    setShowNewColumnButton(true);
  }

  async function addNewColumn(title) {
    // console.log("shaheer");
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

    try{
      console.log(newColumn);
      const response= await createPostRequest({name: newColumn.title},"/api/list/66bd9966b8828f0a82044a99");
      
    if(response.status!=201){
      console.error('Faild to add column to the backend');
      
    }
    }
    catch(error){
      console.error('Error Adding column:',error);
    }
  }
 
  return (
    <Container>
      {showNewColumnButton ? (
        <FormButton onClick={onNewColumnButtonClick}>+Add a list</FormButton>
      ) : (
        <div>
          <Container1>
            <Input
              type="text"
              placeholder="Enter list title..."
              value={value}
              onChange={handleInputChange}
              onBlur={onNewColumnInputComplete}
              onKeyDown={handleEnterKeyPress}
            />
            <div>
              <AddTaskButton onClick={onNewColumnInputComplete}>
                Add list
              </AddTaskButton>
              <CloseButton onClick={onNewColumnButtonClick}>
                <IoCloseOutline />
              </CloseButton>
            </div>
          </Container1>
        </div>
      )}
    </Container>
  );
}

export default AddColumn;
