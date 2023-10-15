import React, { useState } from "react";
import styled from 'styled-components';

const FormButton = styled.button`

background-color: lightgray;
  color: #fff;
  border: none;
  border-radius: 10px;
  margin-top: 8px;
  margin-left:5px;
  width:200px;
  padding: 10px 20px;
  font-size: small;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: grey;
  }
`;
function AddColumn(props) {
    const [showNewColumnButton, setShowNewColumnButton] = useState(true);
    const [value, setValue] = useState("");

    function handleInputChange(event) {
        setValue(event.target.value);
    }

    function onNewColumnButtonClick() {
        setShowNewColumnButton(false);
    }

    function onNewColumnInputComplete() {
        setShowNewColumnButton(true);
        addNewColumn(value);
        setValue("");
    }

    function addNewColumn(title) {
        const newColumnOrder = Array.from(props.state.columnOrder);
        const newColumnId = 'column-' + Math.floor(Math.random() * 100000);
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
                [newColumnId]: newColumn
            }
        });
    }

    return (
        <div>
            {
                showNewColumnButton ?
                <FormButton onClick={onNewColumnButtonClick}>New Column</FormButton> :
                <input type="text" value={value} onChange={handleInputChange} onBlur={onNewColumnInputComplete} />
            }
        </div>
    )
}

export default AddColumn;