package com.recover.project.dto.auth;

public record SignupResponse(
   String message, 
   String username, 
   String email
) {}
