package com.example.ticketmanager.service;

import com.example.ticketmanager.dto.LoginRequest;
import com.example.ticketmanager.dto.RegisterRequest;
import com.example.ticketmanager.entity.User;
import com.example.ticketmanager.repository.UserRepository;
import com.example.ticketmanager.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    @InjectMocks
    private AuthService authService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Test
    void testRegisterShouldReturnToken() {
        // Given
        RegisterRequest request = new RegisterRequest("user@example.com", "password123");
        User savedUser = User.builder()
                .id(1L)
                .email(request.email())
                .password("encoded")
                .role("USER")
                .build();

        // When
        when(passwordEncoder.encode(request.password())).thenReturn("encoded");
        when(userRepository.save(any(User.class))).thenAnswer(invocationOnMock -> {
            User u = invocationOnMock.getArgument(0);
            u.setId(1L);
            return u;
        });
        when(jwtUtil.generateToken(any(User.class))).thenReturn("mocked-jwt-token");

        // Then
        String token = authService.register(request);
        assertEquals("mocked-jwt-token", token);

        // Verify that the password was encoded and user saved
        verify(passwordEncoder).encode("password123");
        verify(userRepository).save(any(User.class));
        verify(jwtUtil).generateToken(savedUser);
    }

    @Test
    void testLoginShouldReturnToken() {
        // Given
        LoginRequest request = new LoginRequest("user@example.com", "password123");
        User user = User.builder()
                .email(request.email())
                .password("encoded-password")
                .role("USER")
                .build();

        // When
        when(userRepository.findByEmail(request.email())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(request.password(), user.getPassword())).thenReturn(true);
        when(jwtUtil.generateToken(user)).thenReturn("mocked-jwt-token");

        // Then
        String token = authService.login(request);
        assertEquals("mocked-jwt-token", token);

        verify(userRepository).findByEmail("user@example.com");
        verify(passwordEncoder).matches("password123", "encoded-password");
        verify(jwtUtil).generateToken(user);
    }
}
