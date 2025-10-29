import React, { useState, useEffect, useCallback } from 'react';
import { getAllTickets, createTicket, updateTicket, deleteTicket } from '../services/ticketService';
import KanbanBoard from '../components/KanbanBoard';
import TicketModal from '../components/TicketModal';

const statusMap = {
  'OPEN': 'To Do',
  'IN_PROGRESS': 'In Progress',
  'CLOSED': 'Done'
};

const statusReverseMap = {
  'To Do': 'OPEN',
  'In Progress': 'IN_PROGRESS',
  'Done': 'CLOSED'
};

function Dashboard() {
  const [columns, setColumns] = useState({
    'To Do': { name: 'To Do', items: [] },
    'In Progress': { name: 'In Progress', items: [] },
    'Done': { name: 'Done', items: [] }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentTicket, setCurrentTicket] = useState(null);

  const fetchTickets = useCallback(async () => {
    try {
      const fetchedTickets = await getAllTickets();
      const newColumns = {
        'To Do': { name: 'To Do', items: [] },
        'In Progress': { name: 'In Progress', items: [] },
        'Done': { name: 'Done', items: [] }
      };
      fetchedTickets.forEach(ticket => {
        const columnName = statusMap[ticket.status];
        if (columnName) {
          newColumns[columnName].items.push(ticket);
        }
      });
      setColumns(newColumns);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const openModal = (mode, ticket = null) => {
    setModalMode(mode);
    setCurrentTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTicket(null);
  };

  const handleSaveTicket = async (ticketData) => {
    try {
      if (modalMode === 'add') {
        const newTicket = { title: ticketData.title, description: ticketData.description, status: statusReverseMap[ticketData.status] };
        await createTicket(newTicket);
      } else {
        await updateTicket(ticketData.id, ticketData);
      }
      fetchTickets(); // Refetch tickets to update the board
      closeModal();
    } catch (error) {
      console.error('Failed to save ticket:', error);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await deleteTicket(ticketId);
        fetchTickets(); // Refetch tickets to update the board
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Dashboard</h2>
      <KanbanBoard columns={columns} setColumns={setColumns} openModal={openModal} handleDeleteTicket={handleDeleteTicket} />
      <TicketModal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal} 
        onSave={handleSaveTicket} 
        ticket={currentTicket}
      />
    </div>
  );
}

export default Dashboard;