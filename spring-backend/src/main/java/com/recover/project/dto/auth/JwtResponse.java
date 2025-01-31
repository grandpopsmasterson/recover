package com.recover.project.dto.auth;

public record JwtResponse(String token, String type, String username) {
    public JwtResponse(String token, String username) {
        this(token, "Bearer", username);
    }
}
