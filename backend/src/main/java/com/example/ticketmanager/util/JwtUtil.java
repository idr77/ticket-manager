package com.example.ticketmanager.util;

import com.example.ticketmanager.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * Utility class for handling JSON Web Tokens (JWTs).
 * Provides methods for generating and validating tokens.
 */
@Component
public class JwtUtil {

    /**
     * The secret key used for signing and verifying JWTs.
     * This value is injected from the application's configuration properties (e.g., application.properties).
     */
    @Value("${JWT_SECRET}")
    private String jwtSecret;

    /**
     * Generates a signed JWT for a given user.
     * The token contains the user's email as the subject and their role as a claim, and is valid for 24 hours.
     *
     * @param user The user entity for whom the token will be generated. Must not be null.
     * @return A compact, URL-safe, signed JWT string.
     */
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8)))
                .compact();
    }

    /**
     * Extracts the username (subject) from a given JWT.
     *
     * @param token The JWT string to parse.
     * @return The username (email) extracted from the token's subject claim.
     */
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8))) // Secure the key
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}