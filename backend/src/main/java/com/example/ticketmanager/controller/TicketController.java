package com.example.ticketmanager.controller;

import com.example.ticketmanager.dto.TicketDto;
import com.example.ticketmanager.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @PostMapping
    public ResponseEntity<TicketDto> create(@RequestBody TicketDto dto, Principal principal) {
        return ResponseEntity.ok(ticketService.createTicket(dto, principal.getName()));
    }

    @GetMapping
    public ResponseEntity<List<TicketDto>> getAll() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }
}
