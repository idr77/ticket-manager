import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TicketService, Ticket } from './ticket.service';

describe('TicketService', () => {
  let service: TicketService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketService, 
        provideHttpClient(withFetch()), 
        provideHttpClientTesting() 
    ]
    });
    service = TestBed.inject(TicketService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all tickets', () => {
    const mockTickets: Ticket[] = [{
      id: '1',
      title: 'Test Ticket',
      description: 'This is a test ticket.',
      status: 'TO_DO'
    }];

    service.getAllTickets().subscribe(tickets => {
      expect(tickets.length).toBe(1);
      expect(tickets).toEqual(mockTickets);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/tickets');
    expect(req.request.method).toBe('GET');
    req.flush(mockTickets);
  });
});
