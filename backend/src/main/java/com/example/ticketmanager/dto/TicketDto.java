package com.example.ticketmanager.dto;

/**
 * Data Transfer Object (DTO) for Ticket information.
 * Immutable record class representing ticket data exchanged between application layers.
 *
 * @param id          The unique identifier of the ticket.
 * @param title       The title or subject of the ticket.
 * @param description The detailed description of the ticket.
 * @param status      The current status of the ticket (e.g., "OPEN", "IN_PROGRESS", "CLOSED").
 * @param userEmail   The email address of the user who created the ticket.
 */
public record TicketDto(Long id, String title, String description, String status, String userEmail) {
}
