package com.example.ticketmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main class for the Ticket Manager Spring Boot application.
 * Starts the application context and initializes all components.
 */
@SpringBootApplication
public class TicketManagerApplication {

    /**
     * Main entry point for the Spring Boot application.
     * @param args Command line arguments.
     */
    public static void main(String[] args) {
        SpringApplication.run(TicketManagerApplication.class, args);
    }
}
