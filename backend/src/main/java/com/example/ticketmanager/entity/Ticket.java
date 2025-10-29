package com.example.ticketmanager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a ticket entity in the database.
 * Each ticket has a title, description, status, and is associated with a creator.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {

    /**
     * The unique identifier for the ticket.
     * Generated automatically by the database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The title of the ticket.
     */
    private String title;

    /**
     * A detailed description of the issue or request.
     */
    private String description;

    /**
     * The current status of the ticket.
     * Expected values are "OPEN", "IN_PROGRESS", "CLOSED".
     */
    private String status;

    /**
     * The user who created the ticket.
     * This establishes a many-to-one relationship with the User entity.
     */
    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;
}