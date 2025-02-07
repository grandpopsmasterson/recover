package com.recover.project.controller.auth;

import com.recover.project.dto.auth.JwtResponse;
import com.recover.project.dto.auth.LoginRequest;
import com.recover.project.dto.auth.PasswordResetRequest;
import com.recover.project.dto.auth.SignupRequest;
import com.recover.project.dto.auth.SignupResponse;
import com.recover.project.mapper.UserMapper;
import com.recover.project.model.User;
import com.recover.project.service.authorization.PasswordResetService;
import com.recover.project.service.authorization.UserDetailsImpl;
import com.recover.project.service.authorization.UserService;
import com.recover.project.service.email.EmailService;
import com.recover.project.utils.auth.JwtUtils;
import com.recover.project.utils.exceptions.InvalidTokenException;
import com.recover.project.utils.exceptions.ResourceNotFoundException;

import io.github.resilience4j.ratelimiter.RateLimiter;
import io.github.resilience4j.ratelimiter.RequestNotPermitted;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.concurrent.CompletableFuture;

import org.apache.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserService userService;
    private final EmailService emailService;
    private final PasswordResetService passwordResetService;
    private final PasswordEncoder passwordEncoder;
    private final RateLimiter authRateLimiter;
    private final UserMapper userMapper;

   @PostMapping("/api/Auth/SignUp")
   public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest request) {
       try {
           authRateLimiter.acquirePermission();
       } catch (RequestNotPermitted e) {
           return ResponseEntity
               .status(HttpStatus.SC_TOO_MANY_REQUESTS)
               .body("Too many signup attempts. Please try again later.");
       } 
       try {
           if (userService.existsByUsername(request.username())) {
               return ResponseEntity
                   .status(HttpStatus.SC_CONFLICT)
                   .body("Username already taken");
           }
           if (userService.existsByEmail(request.email())) {
               return ResponseEntity
                   .status(HttpStatus.SC_CONFLICT)
                   .body("Email already in use");
           }
           User user = userMapper.toEntity(request);
           user.setPassword(passwordEncoder.encode(request.password()));
           final User savedUser = userService.save(user);   
           if (savedUser != null) {
               // Use savedUser in async operation
               CompletableFuture.runAsync(() -> {
                   try {
                       emailService.sendAccountCreationEmail(savedUser);
                   } catch (Exception e) {
                       logger.error("Failed to send welcome email to user: {}", savedUser.getEmail(), e);
                   }
               });
               return ResponseEntity.ok(new SignupResponse(
                   "User registered successfully",
                   savedUser.getUsername(),
                   savedUser.getEmail()
               ));
           } else {
               return ResponseEntity
                   .status(HttpStatus.SC_INTERNAL_SERVER_ERROR)
                   .body("Failed to create user");
           }
       } catch (Exception e) {
           logger.error("Error during user registration", e);
           return ResponseEntity
               .status(HttpStatus.SC_INTERNAL_SERVER_ERROR)
               .body("An error occurred during registration");
       }
   }

    @PostMapping("/Auth/Login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest request, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.usernameOrEmail(), request.password())  // Match your DTO field name
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            String jwt = jwtUtils.generateJwtToken(authentication);

            ResponseCookie jwtCookie = ResponseCookie.from("jwt", jwt)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(24 * 60 * 60)
                    .sameSite("Strict")
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());

            return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername()));
        } catch (BadCredentialsException e) {  // Catch specific exception
            return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie clearCookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0) // Expire immediately
                .sameSite("Strict")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, clearCookie.toString());
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody String email) {
        User user = userService.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        if (user != null) {
            passwordResetService.initiatePasswordReset(email);
        }
        return ResponseEntity.ok("Please check your email for a password reset link.");
    }
  
    @PostMapping("/api/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest request) {
        // Validate token
        if (!jwtUtils.validatePasswordResetToken(request.token())) {
            throw new InvalidTokenException("Token is invalid or expired");
        }
        // String token, String newPassword
        // Get email from token
        String email = jwtUtils.getEmailFromResetToken(request.token());


        User user = userService.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        user.setPassword(passwordEncoder.encode(request.password()));
        userService.save(user);
        
        return ResponseEntity.ok("Password successfully reset");
    }
}

