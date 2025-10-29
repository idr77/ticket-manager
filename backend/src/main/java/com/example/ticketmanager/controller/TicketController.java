package com.example.ticketmanager.controller;

import com.example.ticketmanager.dto.TicketDto;
import com.example.ticketmanager.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * REST controller for managing tickets.
 * Provides endpoints to create, retrieve, update, and delete tickets.
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
     */
    @PostMapping
    public ResponseEntity<TicketDto> create(@RequestBody TicketDto dto, Principal principal) {
        return ResponseEntity.ok(ticketService.createTicket(dto, principal.getName()));
    }

    /**
     * Get all tickets.
     *
     * @return List of all tickets.
     */
    @GetMapping
    public ResponseEntity<List<TicketDto>> getAll() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    /**
     * Update an existing ticket.
     *
     * @param id The ID of the ticket to update.
     * @param ticketDto The DTO with updated ticket data.
     * @return The updated ticket.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TicketDto> update(@PathVariable Long id, @RequestBody TicketDto ticketDto) {
        return ResponseEntity.ok(ticketService.updateTicket(id, ticketDto));
    }

    /**
     * Delete a ticket by its ID.
     *
     * @param id The ID of the ticket to delete.
     * @return A response with no content.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }
}