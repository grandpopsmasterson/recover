package com.recover.project.service.authorization;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.recover.project.model.User;
import com.recover.project.repository.UserRepository;
import com.recover.project.service.email.EmailService;
import com.recover.project.utils.auth.JwtUtils;
import com.recover.project.utils.exceptions.ResourceNotFoundException;

@Service
public class PasswordResetService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final Logger logger = LoggerFactory.getLogger(PasswordResetService.class);

    public PasswordResetService(
            UserRepository userRepository,
            EmailService emailService,
            PasswordEncoder passwordEncoder,
            JwtUtils jwtUtils
    ) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public void initiatePasswordReset(String email) {
        logger.debug("Initiating password reset for email: {}", email);
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String resetToken = jwtUtils.generatePasswordResetToken(email);
        emailService.sendPasswordResetEmail(user, resetToken);
        
        logger.info("Password reset initiated for user: {}", email);
    }

    public void resetPassword(String token, String newPassword) {
        if (!jwtUtils.validatePasswordResetToken(token)) {
            logger.error("Invalid reset token provided");
            throw new IllegalArgumentException("Invalid or expired reset token");
        }

        String email = jwtUtils.getEmailFromResetToken(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        
        logger.info("Password reset successful for user: {}", email);
    }
}
