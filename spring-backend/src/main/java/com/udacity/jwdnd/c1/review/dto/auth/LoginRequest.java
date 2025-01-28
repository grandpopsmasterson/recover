package com.udacity.jwdnd.c1.review.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
   @NotBlank String usernameOrEmail,
   @NotBlank String password
) {}
