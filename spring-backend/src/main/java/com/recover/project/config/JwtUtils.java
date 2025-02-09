package com.recover.project.config;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.recover.project.service.authorization.UserDetailsImpl;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwtsecret}")
    private String jwtSecret;

    @Value("${jwtExpirationMs}")
    private int jwtExpirationMs;

    @Value("${jwtResetExpirationMs}")
    private int jwtResetExpirationMs;

    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        if (userPrincipal == null || userPrincipal.getUsername() == null) {
            logger.error("UserPrincipal or username is null!");
            throw new IllegalArgumentException("User details cannot be null");
        }

        String jwt = Jwts.builder()
            .subject(userPrincipal.getUsername())
            .issuedAt(new Date())
            .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
            .signWith(getSigningKey())
            .compact();
        logger.debug("Generated JWT Token: {}", jwt);

        return jwt;
    }
    
    private SecretKey cachedKey = null;

    public SecretKey getSigningKey() {
        if (cachedKey == null) {
            cachedKey = new SecretKeySpec(jwtSecret.getBytes(), "HmacSHA256");
        }
        return cachedKey;
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();
    }

    // Updated to extract token from Authorization header
    public String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        logger.warn("No Bearer token found in request");
        return null;
    }

    public boolean validateJwtToken(String authToken) {
        try {
            logger.debug("Validating token: {}", authToken);
            Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    // Reset password functionality remains the same
    public String generatePasswordResetToken(String email) {
        logger.debug("Generating password reset token for email: {}", email);
        
        String jwt = Jwts.builder()
            .subject(email)
            .issuedAt(new Date())
            .expiration(new Date((new Date()).getTime() + jwtResetExpirationMs))
            .claim("type", "reset")
            .signWith(getSigningKey())
            .compact();
            
        logger.debug("Generated reset token: {}", jwt);
        return jwt;
    }

    public boolean validatePasswordResetToken(String token) {
        try {
            var claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

            return "reset".equals(claims.get("type"));
        } catch (Exception e) {
            logger.error("Error validating reset token: {}", e.getMessage());
            return false;
        }
    }

    public String getEmailFromResetToken(String token) {
        try {
            var claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

            if (!"reset".equals(claims.get("type"))) {
                throw new IllegalArgumentException("Not a valid reset token");
            }

            return claims.getSubject();
        } catch (Exception e) {
            logger.error("Error extracting email from reset token: {}", e.getMessage());
            throw new IllegalArgumentException("Invalid reset token", e);
        }
    }
}



