import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "../../components/Column";
import AddColumn from "../../components/AddColumn";
import { CenteredContainer } from "../../styles/TableStyling";
import {
  createGetRequest,
} from "../../global/requests";


const Container = styled.div`
  display: flex;

  @media screen and (min-width: 845px) {
    display: flex;
    overflow-x: auto;
  }
`;

function Board(props) {
  
  const initialData = {tasks: {}, columns: {}, columnOrder: []};
  const [state, setState] = useState(initialData);

//   {
//     "tasks": {
//         "task-8349": {
//             "id": "task-8349",
//             "content": "sw"
//         }
//     },
//     "columns": {
//         "column-79100": {
//             "id": "column-79100",
//             "title": "ws",
//             "taskIds": [
//                 "task-8349"
//             ]
//         }
//     },
//     "columnOrder": [
//         "column-79100"
//     ]
// }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/list/663079555e45b8f05e243876/all");

        let allCards = {};
        let listsObject = {};

        data.lists.forEach(list => {
            listsObject[list._id] = {
                id: list._id,
                title: list.name,
                taskIds: list.cards.map(card => card._id)
            };
        });

        data.lists.forEach(list => {
            list.cards.forEach(card => {
                allCards[card._id] = { id: card._id, content: card.title, ...card };
            });
        });

        const columnOrder = data.lists.map((list) => list._id);

        setState({
          columns: listsObject,
          tasks: allCards,
          columnOrder,
        })
      } catch (error) {
        console.error("Error fetching data:", error);
      }
   
    };
    fetchData();
  }, []);


  // useEffect(() => {
  //     fetchBoard().then(board => setState(board));
  // }, [props.token]);

  // useEffect(() => {
  //     if (state !== initialData) {
  //         saveBoard();
  //     }
  // }, [state]);

  // async function saveBoard() {
  //     const response = await fetch("/board", {
  //         method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 "Authorization" : "Bearer " + props.token
  //             },
  //         body: JSON.stringify(state)
  //     });
  //     const data = await response.json();
  // }

  // async function fetchBoard() {
  //     const response = await fetch('/board', {headers: {"Authorization" : "Bearer " + props.token}});
  //     const data = await response.json();
  //     return data.board;
  // }

  function onDragEnd(result) {
      const { destination, source, draggableId, type } = result;

      if (!destination) {
          return;
      }
      
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
          return;
      }

      if (type === 'column') {
          const newColumnOrder = Array.from(state.columnOrder);
          newColumnOrder.splice(source.index, 1);
          newColumnOrder.splice(destination.index, 0, draggableId);
    
          setState({
              ...state,
              columnOrder: newColumnOrder,
          });
          return;
      }

      const start = state.columns[source.droppableId]; 
      const finish = state.columns[destination.droppableId]; 

      if (start === finish) {
          const newTaskIds = Array.from(start.taskIds);
          newTaskIds.splice(source.index, 1);
          newTaskIds.splice(destination.index, 0, draggableId);
    
          const newColumn = {
              ...start,
              taskIds: newTaskIds,
          }
    
          setState({...state, 
              columns: {
              ...state.columns,
              [newColumn.id]: newColumn}
          });
          return;
      }

      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
          ...start,
          taskIds: startTaskIds,
      }
  
      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
          ...finish,
          taskIds: finishTaskIds,
      }
  
      setState({...state, 
          columns: {
              ...state.columns,
              [newStart.id]: newStart,
              [newFinish.id]: newFinish,
          }
      });
  }

  console.log(state);
  return (
   
   
   
      <CenteredContainer >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="columns" direction="horizontal" type="column">
            {(provided) => (
              <Container {...provided.droppableProps} ref={provided.innerRef}>
                {state.columnOrder.map((columnId, index) => {
                  const column = state.columns[columnId];
                  const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
                  return (
                    <Column
                      key={column.id}
                      column={column}
                      tasks={tasks}
                      index={index}
                      state={state}
                      setState={setState}
                    />
                  );
                })}
                {provided.placeholder}
                <AddColumn state={state} setState={setState} />
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </CenteredContainer>
   
    
   
  );
}

export default Board;
