package com.example.ticketmanager.util;

import com.example.ticketmanager.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class JwtUtilTest {

    private JwtUtil jwtUtil;
    private final String secret = "myVerySecretKeyThatIsAtLeast32CharactersLong";

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(jwtUtil, "jwtSecret", secret);
    }

    @Test
    void testGenerateAndExtractUsername() {
        // Given
        User user = User.builder()
                .email("test@example.com")
                .role("USER")
                .build();

        // When
        String token = jwtUtil.generateToken(user);
        String username = jwtUtil.extractUsername(token);

        // Then
        assertNotNull(token);
        assertEquals("test@example.com", username);
    }
}
