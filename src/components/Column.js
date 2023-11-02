import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import AddTask from "./AddTask";
// import { OptionItem } from "./Task";
import { BiDotsHorizontalRounded, BiFontSize } from "react-icons/bi";
import { H6 } from "../pages/ForgetPassword";
const Container = styled.div`
  margin-right: 8px;
  border-radius: 10px;
  width: 220px;
  min-width: 220px;
  display: flex;
  flex-direction: column;
   padding-bottom: 10px;
  background: #f5f5f5;
  padding: 5px;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  //  background:red;
`;

const Title = styled.h6`
  // flex: 1;
  padding: 8px;

   margin-left: -5px;
  font-weight: bold;
  position: relative;
  cursor: pointer;
  font-size:13px;
`;

const OptionsMenu = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 5px;
  // right: 0;
  margin-left:180px;
  margin-top:25px;
  top: 30px;
  z-index: 1;
  width: 230px;
  font-size:11px;
`;



const TaskList = styled.div`
  padding: 0px;
`;
const EditButtonWrapper = styled.div`
  // margin-left: auto;
`;
const EditButton = styled.button`
   margin-top: 5px;

  background: none;
  border: none;
  cursor: pointer;

`;
const EditButtonContainer = styled.div`
  display: flex;
  width: 20%;
  // margin-bottom:10px;
  border-radius:10px;
  justify-content:center;
  
  &:hover {
    background-color: lightgrey;
  }

`;
const Headingcontainer = styled.div`
  display: flex;
  justify-content: space-between;
  // margin-bottom:5px;
  // background: red;
  padding:5px;
  margin-top:-5px;

`;
const OptionItem = styled.div`
  padding: 3px 5px;
  background-color: white;
  // margin-bottom: 5px;
  border-radius: 5px;

  cursor: pointer;
  &:hover {
    background-color: lightgrey;
  }
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
          <Headingcontainer>
           
            <TitleContainer {...provided.dragHandleProps}>
              <Title
                
                // ref={menuRef}
                // onClick={toggleOptionsMenu}
              >
                {props.column.title}
              </Title>
            </TitleContainer>
            <EditButtonContainer onClick={toggleOptionsMenu}>
              <EditButtonWrapper >
                <EditButton className="edit-button" >
                  <BiDotsHorizontalRounded />
                </EditButton>
              </EditButtonWrapper>

              <OptionsMenu isOpen={isOptionsMenuOpen}  ref={menuRef}>
                <H6 style={{marginTop:'10px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'12px'}}> List Actions</H6>
                <OptionItem 
                 
                  onClick={openAddCardInput(props.columnId, props.context)}
                >
                  Add Card...
                </OptionItem>
                <OptionItem
                  
                  onClick={() => deleteColumn(props.column.id, props.index)}
                >
                  Delete
                </OptionItem>

                <OptionItem >
                  Copy List...
                </OptionItem>
                <OptionItem >
                  Move List...
                </OptionItem>
                <hr style={{ cursor: "not-allowed", pointerEvents: "none" }} />
                <OptionItem >
                  Move all List{" "}
                </OptionItem>
                <OptionItem >
                  Open card
                </OptionItem>
                <hr style={{ cursor: "not-allowed", pointerEvents: "none" }} />
                <OptionItem >
                  When a card is added to...
                </OptionItem>
                <OptionItem >
                 Every Day sort by List...
                </OptionItem>
                <OptionItem >
                 Every Monday sort by List...
                </OptionItem>
                <hr style={{ cursor: "not-allowed", pointerEvents: "none" }} />
                <hr style={{ cursor: "not-allowed", pointerEvents: "none" }} />
              </OptionsMenu>
            </EditButtonContainer>
          </Headingcontainer>
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
