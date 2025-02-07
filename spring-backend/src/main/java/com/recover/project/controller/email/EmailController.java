package com.recover.project.controller.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recover.project.model.User;
import com.recover.project.utils.exceptions.ResourceNotFoundException;
import com.recover.project.service.authorization.UserService;
import com.recover.project.service.email.EmailService;

@RestController
@RequestMapping("/api/v1/emails")
public class EmailController {
    private final EmailService emailService;
    private UserService userService;

    public EmailController(
        @Autowired EmailService emailService
    ) {
        this.emailService = emailService;
    }

    @PostMapping("/account-creation")
    public ResponseEntity<String> sendAccountCreationEmail(
        @RequestBody String to
    ) {
        User user = userService.findByEmail(to).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + to));
        if (user != null) {
            emailService.sendAccountCreationEmail(user);
        }

        return ResponseEntity.ok("Account Creation Email Sent Successfully.");
    }
}
