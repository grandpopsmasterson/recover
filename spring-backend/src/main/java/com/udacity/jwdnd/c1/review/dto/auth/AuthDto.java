package com.udacity.jwdnd.c1.review.dto.auth;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import com.udacity.jwdnd.c1.review.model.enums.UserType;

import java.time.LocalDateTime;

@Data
public class AuthDto {
    @Getter @Setter
    public static class LoginRequest {
        private String email;
        private String username;
        private String password;
    }

    @Getter @Setter
    public static class SignupRequest {
        private String email;
        private String password;
        private String firstName;
        private String lastName;
        private UserType initialRole;
    }

    @Getter @Setter
    public static class TokenResponse {
        private String token;
        private String refreshToken;
        private LocalDateTime expiresAt;
    }
    
    @Getter @Setter
    public static class JwtResponse {
        private String token;
        private String type = "Bearer";
        private String username;

        public JwtResponse(String accessToken, String username) {
            this.token = accessToken;
            this.username = username;
        }

    }
}
