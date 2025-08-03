package com.example.ticketmanager.service;

import com.example.ticketmanager.dto.TicketDto;
import com.example.ticketmanager.entity.Ticket;
import com.example.ticketmanager.entity.User;
import com.example.ticketmanager.repository.TicketRepository;
import com.example.ticketmanager.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TicketServiceTest {
    @InjectMocks
    private TicketService ticketService;

    @Mock
    private TicketRepository ticketRepository;

    @Mock
    private UserRepository userRepository;

    @Test
    void testCreateTicket() {
        TicketDto dto = new TicketDto(null, "Title", "Desc", "OPEN", null);
        User user = new User(1L, "user@example.com", "pass", "USER");
        Ticket ticket = Ticket.builder().id(1L).title("Title").description("Desc").status("OPEN").creator(user).build();

        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(ticketRepository.save(any())).thenReturn(ticket);

        TicketDto result = ticketService.createTicket(dto, "user@example.com");
        assertEquals("Title", result.title());    }
}
