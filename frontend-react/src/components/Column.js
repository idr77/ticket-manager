import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TicketCard from './TicketCard';
import { FaPlus } from 'react-icons/fa';

function Column({ columnId, column, openModal, handleDeleteTicket }) {
  return (
    <div className="column">
      <div className="column-header">
        <h3>{column.name}</h3>
        <button className="add-ticket-btn" onClick={() => openModal('add', { status: columnId })}>
          <FaPlus />
        </button>
      </div>
      <Droppable droppableId={columnId} key={columnId}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="droppable-area"
              style={{
                background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
              }}
            >
              {column.items.map((item, index) => {
                return <TicketCard key={item.id} item={item} index={index} openModal={openModal} handleDeleteTicket={handleDeleteTicket} />;
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default Column;