package com.example.ticketmanager.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

/**
 * Configures the OpenAPI (Swagger) documentation for the API.
 * This class uses annotations to define the API's metadata, servers, and security schemes.
 * The generated documentation can be accessed at /swagger-ui.html.
 */
@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "Ticket Manager API", 
        version = "1.0", 
        description = "API documentation for managing tickets",
        contact = @Contact(
            name = "Support Dev Team",
            email = "john.doe@example.com"
        ),
        license = @License(
            name = "MIT",
            url = "https://opensource.org/licenses/MIT"
        )),
        servers = {
            @Server(
                url = "http://localhost:8080",
                description = "Local server"
            ),
            @Server(
                url = "https://api.example.com",
                description = "Production server"
            )
        }
        )
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    scheme = "bearer",
    bearerFormat = "JWT"
)
public class SwaggerConfig {
    
}