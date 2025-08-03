package com.example.ticketmanager.service;

import com.example.ticketmanager.dto.TicketDto;
import com.example.ticketmanager.entity.Ticket;
import com.example.ticketmanager.entity.User;
import com.example.ticketmanager.repository.TicketRepository;
import com.example.ticketmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketRepository ticketRepository;

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


    public List<TicketDto> getAllTickets() {
        return ticketRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    private TicketDto toDTO(Ticket t) {
        return new TicketDto(t.getId(), t.getTitle(), t.getDescription(), t.getStatus(), t.getCreator().getEmail());
    }

}
