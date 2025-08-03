package com.example.ticketmanager.dto;

public record TicketDto(Long id, String title, String description, String status, String userEmail) {
}
