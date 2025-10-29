// Liste des tickets après authentification
import React, { useEffect, useState } from 'react';
import './TicketList.css';
import { getTickets } from '../services/ticketService';

interface Ticket {
  id: number;
  title: string;
  status: string;
}

function TicketList(): JSX.Element {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data);
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
        // Gérer l'erreur, par exemple en affichant un message à l'utilisateur
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="ticket-list-container">
      <h2>Your Tickets</h2>
      <div>
        {tickets.map((ticket: Ticket) => (
          <div key={ticket.id} className={`ticket-card ${ticket.status.toLowerCase()}`}>
            <div className="ticket-content">
              <div className="ticket-title">{ticket.title}</div>
            </div>
            <div className={`ticket-status ${ticket.status.toLowerCase()}`}>
              {ticket.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketList;