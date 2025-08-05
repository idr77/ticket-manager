// Liste des tickets après authentification
import React, { useEffect, useState } from 'react';
import api from '../services/api';

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await api.get('/tickets');
      setTickets(response.data);
    };
    fetchTickets();
  }, []);

  return (
    <div>
      <h3>Your Tickets</h3>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>{ticket.title} - {ticket.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;