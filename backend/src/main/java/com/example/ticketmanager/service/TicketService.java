package com.example.ticketmanager.service;

import com.example.ticketmanager.dto.TicketDto;
import com.example.ticketmanager.entity.Ticket;
import com.example.ticketmanager.entity.User;
import com.example.ticketmanager.repository.TicketRepository;
import com.example.ticketmanager.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for handling business logic related to tickets.
 * This includes creating, retrieving, updating, and deleting tickets.
 */
@Service
public class TicketService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketRepository ticketRepository;

    /**
     * Creates a new ticket based on the provided data and assigns it to the user identified by email.
     *
     * @param dto The data transfer object containing the ticket's title and description.
     * @param userEmail The email of the user creating the ticket.
     * @return A DTO representing the newly created ticket.
     * @throws UsernameNotFoundException if the user with the given email does not exist.
     */
    public TicketDto createTicket(TicketDto dto, String userEmail) {
        User creator = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Ticket ticket = Ticket.builder()
                .title(dto.title())
                .description(dto.description())
                .status("OPEN")
                .creator(creator)
                .build();
        return toDTO(ticketRepository.save(ticket));
    }

    /**
     * Retrieves a list of all tickets in the system.
     *
     * @return A list of DTOs, each representing a ticket.
     */
    public List<TicketDto> getAllTickets() {
        return ticketRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    /**
     * Updates an existing ticket.
     *
     * @param id The ID of the ticket to update.
     * @param ticketDto The DTO containing the updated ticket data.
     * @return A DTO representing the updated ticket.
     * @throws EntityNotFoundException if no ticket is found with the given ID.
     */
    public TicketDto updateTicket(Long id, TicketDto ticketDto) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found with id: " + id));

        ticket.setTitle(ticketDto.title());
        ticket.setDescription(ticketDto.description());
        ticket.setStatus(ticketDto.status());

        Ticket updatedTicket = ticketRepository.save(ticket);
        return toDTO(updatedTicket);
    }

    /**
     * Deletes a ticket by its ID.
     *
     * @param id The ID of the ticket to delete.
     */
    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }

    /**
     * Converts a Ticket entity to a TicketDto.
     *
     * @param t The Ticket entity to convert.
     * @return The corresponding TicketDto.
     */
    private TicketDto toDTO(Ticket t) {
        return new TicketDto(t.getId(), t.getTitle(), t.getDescription(), t.getStatus(), t.getCreator().getEmail());
    }

}
