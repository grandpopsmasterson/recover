package com.udacity.jwdnd.c1.review.controller.auth;

import com.udacity.jwdnd.c1.review.dto.auth.JwtResponse;
import com.udacity.jwdnd.c1.review.dto.auth.LoginRequest;
import com.udacity.jwdnd.c1.review.dto.auth.SignupRequest;
import com.udacity.jwdnd.c1.review.dto.auth.SignupResponse;
import com.udacity.jwdnd.c1.review.model.User;
import com.udacity.jwdnd.c1.review.service.authorization.UserDetailsImpl;
import com.udacity.jwdnd.c1.review.service.roles.UserService;
import com.udacity.jwdnd.c1.review.utils.auth.JwtUtils;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final UserService userService;
   // private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest request) {
        if (userService.existsByUsername(request.username())) {
            return ResponseEntity.badRequest().body("Username already taken");
        }
        if (userService.existsByEmail(request.email())) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        User user = User.builder()
            .username(request.username())
            .email(request.email())
            .password(encoder.encode(request.password()))
            .userType(request.usertype())
            .build();

        userService.save(user);

        return ResponseEntity.ok(new SignupResponse(
            "User registered successfully", 
            user.getUsername(),
            user.getEmail()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {  // Add @Valid
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
}

