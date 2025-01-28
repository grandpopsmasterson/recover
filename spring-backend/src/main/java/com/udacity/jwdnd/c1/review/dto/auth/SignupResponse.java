package com.udacity.jwdnd.c1.review.dto.auth;

public record SignupResponse(
   String message, 
   String username, 
   String email
) {}
