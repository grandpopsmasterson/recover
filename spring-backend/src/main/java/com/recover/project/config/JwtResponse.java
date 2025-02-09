package com.recover.project.config;

import java.util.Collections;
import java.util.Set;

public record JwtResponse(
    String token,
    String username,
    String email,
    Set<String> roles
) {
    // Constructor overload if you don't need all fields
    public JwtResponse(String token, String username) {
        this(token, username, null, Collections.emptySet());
    }
}