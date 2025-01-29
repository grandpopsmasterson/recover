package com.recover.project.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
   @NotBlank String usernameOrEmail,
   @NotBlank String password
) {}
