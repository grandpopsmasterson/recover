package com.udacity.jwdnd.c1.review.controller.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.udacity.jwdnd.c1.review.service.email.EmailService;
import com.udacity.jwdnd.c1.review.model.User;

@RestController
@RequestMapping("/api/v1/emails")
public class EmailController {
    private final EmailService emailService;

    public EmailController(
        @Autowired EmailService emailService
    ) {
        this.emailService = emailService;
    }

    @PostMapping("/account-creation")
    public ResponseEntity<String> sendAccountCreationEmail(User user)
 {
    emailService.sendAccountCreationEmail(user);
    return ResponseEntity.ok("Account Creation Email Sent Successfully");
 }}
