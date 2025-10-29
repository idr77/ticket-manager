package com.example.ticketmanager.dto;

/**
 * Represents the data transfer object for a new user registration request.
 * This is an immutable record containing the information required to create a new user.
 *
 * @param email    The email address for the new user.
 * @param password The desired raw password for the new user.
 */
public record RegisterRequest(String email, String password) {
}