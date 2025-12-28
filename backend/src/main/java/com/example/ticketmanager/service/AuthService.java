package com.example.ticketmanager.service;

import com.example.ticketmanager.dto.LoginRequest;
import com.example.ticketmanager.dto.RegisterRequest;
import com.example.ticketmanager.entity.User;
import com.example.ticketmanager.repository.UserRepository;
import com.example.ticketmanager.util.JwtUtil;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service class for handling authentication-related business logic.
 * This includes user registration and login.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Registers a new user in the system.
     *
     * @param request The registration request containing the user's email and
     *                password.
     * @return A JWT for the newly registered user.
     * @throws IllegalArgumentException if the email is already in use.
     */
    public String register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }
        User user = User.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role("USER")
                .build();
        userRepository.save(user);
        return jwtUtil.generateToken(user);
    }

    /**
     * Authenticates a user and provides a JWT upon successful login.
     *
     * @param request The login request containing the user's email and password.
     * @return A JWT for the authenticated user.
     * @throws UsernameNotFoundException if no user is found with the given email.
     * @throws BadCredentialsException   if the provided password does not match.
     */
    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }
        return jwtUtil.generateToken(user);
    }
}