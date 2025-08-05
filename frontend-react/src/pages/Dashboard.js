// Page de dashboard une fois connecté
import React from 'react';
import TicketList from '../components/TicketList';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <TicketList />
    </div>
  );
}

export default Dashboard;