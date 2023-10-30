import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import AddTask from "./AddTask";
import { OptionItem} from "./Task";
import { BiDotsHorizontalRounded } from "react-icons/bi";
const Container = styled.div`
   margin-right: 8px;
  // border: 1px solid lightgrey;
  border-radius: 10px;
  width: 250px;
  min-width: 250px;

  display: flex;
  flex-direction: column;
  align-items: left;
  padding-bottom: 10px;
  background: #f5f5f5;
  padding: 10px;
  height:100%;
  @media screen and (max-width: 845px) {
    
  }
`;


const Title = styled.h6`
  display: flex;
   align-items: right;
  padding: 8px;
 
  margin-left: 5px;
  font-weight: bold;
  position: relative;
  cursor: pointer; 
`;

const TaskList = styled.div`
  padding: 0px;
`;
const EditButtonWrapper = styled.div`
  margin-left: auto; 
`;
const EditButton = styled.button`
  
  top: 5px;
  
  background: none;
  border: none;
  cursor: pointer;
  
`;
const OptionsMenu = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;  
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 5px;
  margin-top:30px;
  margin-left:185px;
  z-index: 1;
  width:190px;
`;


function Column(props) {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [showAddCardInput, setShowAddCardInput] = useState(false);

  function openAddCardInput() {
    setShowAddCardInput(true);
  }

  const menuRef = useRef(null);
  const toggleOptionsMenu = () => {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOptionsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  function deleteColumn(columnId, index) {
    const columnTasks = props.state.columns[columnId].taskIds;

    const finalTasks = columnTasks.reduce((previousValue, currentValue) => {
      const { [currentValue]: oldTask, ...newTasks } = previousValue;
      return newTasks;
    }, props.state.tasks);

    const columns = props.state.columns;
    const { [columnId]: oldColumn, ...newColumns } = columns;

    const newColumnOrder = Array.from(props.state.columnOrder);
    newColumnOrder.splice(index, 1);

    props.setState({
      tasks: {
        ...finalTasks,
      },
      columns: {
        ...newColumns,
      },
      columnOrder: newColumnOrder,
    });
  }
  const containerHeight = `${props.tasks.length * 100}px`;
  // function openAddCardInput() {
  //   props.onOpenAddCard(); // Call the function passed from the parent
  // }
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          height={containerHeight}
        >
          <Title
            {...provided.dragHandleProps}
            ref={menuRef}
            onClick={toggleOptionsMenu} 
          >
            {props.column.title}
             <EditButtonWrapper>
              <EditButton className="edit-button" onClick={toggleOptionsMenu}>
                <BiDotsHorizontalRounded />
              </EditButton>
            </EditButtonWrapper>
         
          <OptionsMenu isOpen={isOptionsMenuOpen}>
          <OptionItem style={{ fontWeight: 'normal' }} onClick={openAddCardInput(props.columnId,props.context)}>
                Add Card...
              </OptionItem>
            <OptionItem style={{ fontWeight: 'normal' }} onClick={() => deleteColumn(props.column.id, props.index)}>Delete</OptionItem>
            
            <OptionItem style={{ fontWeight: 'normal' }}>Copy List...</OptionItem>
            <OptionItem style={{ fontWeight: 'normal' }}>Move List...</OptionItem>
            <hr style={{ cursor: 'not-allowed', pointerEvents: 'none' }} />
            <OptionItem style={{ fontWeight: 'normal' }}>Move all List </OptionItem>
            <OptionItem style={{ fontWeight: 'normal' }}>Open card</OptionItem>
          </OptionsMenu> 
 </Title>
          <Droppable droppableId={props.column.id} type="task">
            {(provided) => (
              <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                {props.tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    columnId={props.column.id}
                    state={props.state}
                    setState={props.setState}
                    onOpenAddCard={openAddCardInput} 
                  />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          <AddTask
            columnId={props.column.id}
            state={props.state}
            setState={props.setState}
          />
        </Container>
      )}
    </Draggable>
  );
}

export default Column;
