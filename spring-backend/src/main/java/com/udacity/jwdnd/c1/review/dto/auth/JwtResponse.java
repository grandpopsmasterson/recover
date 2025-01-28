package com.udacity.jwdnd.c1.review.dto.auth;

public record JwtResponse(String token, String type, String username) {
    public JwtResponse(String token, String username) {
        this(token, "Bearer", username);
    }
}
