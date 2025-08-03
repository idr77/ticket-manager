package com.example.ticketmanager.util;

import com.example.ticketmanager.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    /**
     * Private
     */
    @Value("${JWT_SECRET}")
    private String jwtSecret;

    /**
     * Generates a signed JSON Web Token for an user.
     * Useful to identify an user without using a session
     * @param user
     * @return A coded string to identify an user.
     */
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extract the subject field of the token (email)
     * @param token
     * @return
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
