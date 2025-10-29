package com.example.ticketmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ticketmanager.dto.LoginRequest;
import com.example.ticketmanager.dto.RegisterRequest;
import com.example.ticketmanager.service.AuthService;

/**
 * REST controller for authentication operations.
 * Provides endpoints for user registration and login.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Registers a new user.
     * @param request Registration request data.
     * @return Success message or error.
     *
     * @api {post} /api/auth/register Register a new user
     * @apiName RegisterUser
     * @apiGroup Auth
     * @apiParam {RegisterRequest} request User registration data.
     * @apiSuccess {String} message Registration result.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            String token = authService.register(request);
            return ResponseEntity.ok(java.util.Map.of("token", token));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Authenticates a user and returns a JWT token.
     * @param request Login request data.
     * @return JWT token or error.
     *
     * @api {post} /api/auth/login Login user
     * @apiName LoginUser
     * @apiGroup Auth
     * @apiParam {LoginRequest} request User login data.
     * @apiSuccess {String} token JWT token.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String token = authService.login(request);
        return ResponseEntity.ok(java.util.Map.of("token", token));
    }
}
