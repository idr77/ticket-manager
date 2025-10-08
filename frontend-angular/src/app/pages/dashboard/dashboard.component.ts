import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { TicketListComponent } from '../../components/ticket-list/ticket-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, TicketListComponent]
})
export class DashboardComponent implements OnInit {
    totalTickets = 0;
    openTickets = 0;
    closedTickets = 0;
  
    constructor(private ticketService: TicketService) {}
  
    ngOnInit(): void {
      this.ticketService.getAllTickets().subscribe(tickets => {
        this.totalTickets = tickets.length;
        this.openTickets = tickets.filter((t: any) => t.status === 'OPEN').length;
        this.closedTickets = tickets.filter((t: any) => t.status === 'CLOSED').length;
      });
    }
}
