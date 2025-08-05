import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
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
