import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

function TicketCard({ item, index, openModal, handleDeleteTicket }) {
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="ticket-card"
            style={{
              userSelect: 'none',
              backgroundColor: snapshot.isDragging ? '#e0e0e0' : '#ffffff',
              ...provided.draggableProps.style
            }}
          >
            <h5>{item.title}</h5>
            <p>{item.description}</p>
            <div className="card-actions">
              <button className="card-action-btn" onClick={() => openModal('edit', item)}>
                <FaPencilAlt />
              </button>
              <button className="card-action-btn" onClick={() => handleDeleteTicket(item.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default TicketCard;
