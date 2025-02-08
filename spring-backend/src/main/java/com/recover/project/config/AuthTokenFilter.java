package com.recover.project.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component; // Add this import
import org.springframework.web.filter.OncePerRequestFilter; // Adjust import based on your package structure

import java.io.IOException;
import java.util.Arrays;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;
    private final String[] publicEndpoints;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    public AuthTokenFilter(
        JwtUtils jwtUtils, 
        UserDetailsService userDetailsService,
        @Value("${security.public.endpoints}") String[] publicEndpoints
    ) {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
        this.publicEndpoints = publicEndpoints;
    }

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            String requestURI = request.getRequestURI();
            
            // Quick check for public endpoints
            if (isPublicEndpoint(requestURI)) {
                filterChain.doFilter(request, response);
                return;
            }

            String jwt = jwtUtils.getTokenFromCookie(request);
            
            if (jwt == null) {
                sendUnauthorizedResponse(response, "No token provided");
                return;
            }

            if (!jwtUtils.validateJwtToken(jwt)) {
                sendUnauthorizedResponse(response, "Invalid token");
                return;
            }

            authenticateUser(jwt, request);
            filterChain.doFilter(request, response);

        } catch (Exception e) {
            logger.error("Authentication error", e);
            sendUnauthorizedResponse(response, "Authentication failed");
        }
    }

    private boolean isPublicEndpoint(String requestURI) {
        return Arrays.stream(publicEndpoints)
            .anyMatch(endpoint -> 
                requestURI.equals(endpoint) || 
                (endpoint.endsWith("/**") && requestURI.startsWith(endpoint.substring(0, endpoint.length() - 3)))
            );
    }

    private void authenticateUser(String jwt, HttpServletRequest request) {
        String username = jwtUtils.getUserNameFromJwtToken(jwt);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        
        UsernamePasswordAuthenticationToken authentication = 
            new UsernamePasswordAuthenticationToken(
                userDetails, 
                null, 
                userDetails.getAuthorities()
            );
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private void sendUnauthorizedResponse(HttpServletResponse response, String message) throws IOException {
        SecurityContextHolder.clearContext();
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(message);
    }
}