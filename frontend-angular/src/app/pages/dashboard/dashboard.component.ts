import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { TicketService, Ticket } from '../../services/ticket.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TicketDialogComponent } from '../../components/ticket-dialog/ticket-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
})
export class DashboardComponent implements OnInit {
  todo: Ticket[] = [];
  inProgress: Ticket[] = [];
  done: Ticket[] = [];

  constructor(private ticketService: TicketService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.ticketService.getAllTickets().subscribe(tickets => {
      this.todo = tickets.filter(t => t.status === 'TO_DO');
      this.inProgress = tickets.filter(t => t.status === 'IN_PROGRESS');
      this.done = tickets.filter(t => t.status === 'DONE');
    });
  }

  drop(event: CdkDragDrop<Ticket[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const ticket = event.previousContainer.data[event.previousIndex];
      const newStatus = this.getNewStatus(event.container.id);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.ticketService.updateTicket(ticket.id, { ...ticket, status: newStatus }).subscribe({
        next: () => console.log(`Ticket ${ticket.id} status updated to ${newStatus}`),
        error: (err) => {
          console.error('Failed to update ticket status', err);
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
        }
      });
    }
  }

  private getNewStatus(containerId: string): 'TO_DO' | 'IN_PROGRESS' | 'DONE' {
    switch (containerId) {
      case 'inProgressList':
        return 'IN_PROGRESS';
      case 'doneList':
        return 'DONE';
      default:
        return 'TO_DO';
    }
  }

  openAddTicketDialog(): void {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '400px',
      data: { title: '', description: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ticketService.createTicket(result).subscribe(newTicket => {
          this.todo.push(newTicket);
        });
      }
    });
  }

  openEditTicketDialog(ticket: Ticket): void {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '400px',
      data: { ...ticket }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ticketService.updateTicket(ticket.id, result).subscribe(updatedTicket => {
          const findAndUpdate = (list: Ticket[]) => {
            const index = list.findIndex(t => t.id === updatedTicket.id);
            if (index > -1) {
              list[index] = updatedTicket;
            }
          };
          findAndUpdate(this.todo);
          findAndUpdate(this.inProgress);
          findAndUpdate(this.done);
        });
      }
    });
  }

  deleteTicket(ticket: Ticket): void {
    if (confirm(`Are you sure you want to delete ticket "${ticket.title}"?`)) {
      this.ticketService.deleteTicket(ticket.id).subscribe(() => {
        const findAndRemove = (list: Ticket[]) => {
          const index = list.findIndex(t => t.id === ticket.id);
          if (index > -1) {
            list.splice(index, 1);
          }
        };
        findAndRemove(this.todo);
        findAndRemove(this.inProgress);
        findAndRemove(this.done);
      });
    }
  }
}