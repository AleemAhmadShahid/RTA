import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import AddTask from './AddTask';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-bottom: 10px;
  background:#ffff;
  padding:10px;
//   height: ${props => props.height || 'auto'};
   max-height: 400px; /* Adjust this value as needed */
//   overflow-y: auto; 
`;
const Title = styled.h6`
  padding: 8px;
  margin-left:10px;
  font-weight:bold;
`;

const TaskList = styled.div`

  padding: 0px;

`;


function Column(props) {

    function deleteColumn(columnId, index) {
        const columnTasks = props.state.columns[columnId].taskIds;
    
        const finalTasks = columnTasks.reduce((previousValue, currentValue) => {
            const {[currentValue]: oldTask, ...newTasks} = previousValue;
            return newTasks;
        }, props.state.tasks);
        
        const columns = props.state.columns;
        const {[columnId]: oldColumn, ...newColumns} = columns; 
    
        const newColumnOrder = Array.from(props.state.columnOrder);
        newColumnOrder.splice(index, 1);
    
        props.setState({
            tasks: {
                ...finalTasks
            },
            columns: {
                ...newColumns
            },
            columnOrder: newColumnOrder
        });
    }
    const containerHeight = `${props.tasks.length * 50}px`;
    return (
        <Draggable draggableId={props.column.id} index={props.index}>
          {provided => (
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
              height={containerHeight} // Set the calculated height
            >
              <Title {...provided.dragHandleProps}>
                {props.column.title}
                <span onClick={() => deleteColumn(props.column.id, props.index)}> X</span>
              </Title>
              <Droppable droppableId={props.column.id} type="task">
                {provided => (
                  <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                    {props.tasks.map((task, index) => (
                      <Task key={task.id} task={task} index={index} columnId={props.column.id} state={props.state} setState={props.setState} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
              <AddTask columnId={props.column.id} state={props.state} setState={props.setState} />
            </Container>
          )}
        </Draggable>
      );
    }

export default Column;
