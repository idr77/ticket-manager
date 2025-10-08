package com.example.ticketmanager.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ticketmanager.dto.TicketDto;
import com.example.ticketmanager.service.TicketService;

/**
 * REST controller for managing tickets.
 * Provides endpoints to create and retrieve tickets.
 *
 * @author YourName
 */
@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    /**
     * Service for ticket operations.
     */
    @Autowired
    private TicketService ticketService;

    /**
     * Create a new ticket.
     *
     * @param dto Ticket data transfer object containing ticket details.
     * @param principal The authenticated user principal.
     * @return The created ticket.
     *
     * @api {post} /api/tickets Create a new ticket
     * @apiName CreateTicket
     * @apiGroup Ticket
     * @apiParam {TicketDto} dto Ticket details.
     * @apiSuccess {TicketDto} ticket The created ticket.
     */
    @PostMapping
    public ResponseEntity<TicketDto> create(@RequestBody TicketDto dto, Principal principal) {
        // Create a ticket for the authenticated user
        return ResponseEntity.ok(ticketService.createTicket(dto, principal.getName()));
    }

    /**
     * Get all tickets.
     *
     * @return List of all tickets.
     *
     * @api {get} /api/tickets Get all tickets
     * @apiName GetAllTickets
     * @apiGroup Ticket
     * @apiSuccess {TicketDto[]} tickets List of tickets.
     */
    @GetMapping
    public ResponseEntity<List<TicketDto>> getAll() {
        // Retrieve all tickets
        return ResponseEntity.ok(ticketService.getAllTickets());
    }
}
