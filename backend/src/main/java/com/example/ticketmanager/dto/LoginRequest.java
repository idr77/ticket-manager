package com.example.ticketmanager.dto;

/**
 * Represents the data transfer object for a user login request.
 * This is an immutable record containing the credentials required for authentication.
 *
 * @param email    The user's email address.
 * @param password The user's raw password.
 */
public record LoginRequest(String email, String password) {
}