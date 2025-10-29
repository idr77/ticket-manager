import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import './KanbanBoard.css';
import { updateTicket } from '../services/ticketService';

const statusReverseMap = {
  'To Do': 'OPEN',
  'In Progress': 'IN_PROGRESS',
  'Done': 'CLOSED'
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;

  const { source, destination } = result;

  if (source.droppableId === destination.droppableId) {
    // Reordering within the same column
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  } else {
    // Moving to a different column
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    // Update ticket status on backend
    const newStatus = statusReverseMap[destColumn.name];
    const updatedTicket = { ...removed, status: newStatus };
    
    updateTicket(removed.id, updatedTicket).catch(err => {
        console.error("Failed to update ticket status", err);
        // TODO: Revert state change on error
    });

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  }
};

function KanbanBoard({ columns, setColumns, openModal, handleDeleteTicket }) {
  return (
    <div className="kanban-board">
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <Column key={columnId} columnId={columnId} column={column} openModal={openModal} handleDeleteTicket={handleDeleteTicket} />
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;