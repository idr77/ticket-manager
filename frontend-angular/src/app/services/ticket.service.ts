import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private baseUrl = 'http://localhost:8080/api/tickets';

  constructor(private http: HttpClient) {}

  getAllTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createTicket(ticket: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, ticket);
  }
}