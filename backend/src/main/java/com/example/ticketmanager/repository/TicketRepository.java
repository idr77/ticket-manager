package com.example.ticketmanager.repository;

import com.example.ticketmanager.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link Ticket} entity.
 * This interface provides standard CRUD (Create, Read, Update, Delete) operations
 * for Ticket entities without requiring any implementation.
 */
@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
}