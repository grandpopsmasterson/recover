package com.recover.project.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import com.recover.project.utils.auth.AuthEntryPointJwt;
import com.recover.project.utils.auth.AuthTokenFilter;

import io.github.resilience4j.ratelimiter.RateLimiter;
import io.github.resilience4j.ratelimiter.RateLimiterConfig;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

   private final UserDetailsService userDetailsService;
   private final AuthEntryPointJwt unauthorizedHandler;
   private final String[] allowedOrigins;

   private static final String[] WHITE_LIST_URL = {"/error", "/login", "/h2-console/**", "/signup", "/refresh-token"};

   public SecurityConfiguration(
           UserDetailsService userDetailsService,
           AuthEntryPointJwt unauthorizedHandler,
           @Value("${cors.allowed-origins}") String[] allowedOrigins) {
       this.userDetailsService = userDetailsService;
       this.unauthorizedHandler = unauthorizedHandler;
       this.allowedOrigins = allowedOrigins;
   }

   @Bean
   public AuthTokenFilter authenticationJwtTokenFilter() {
       return new AuthTokenFilter();
   }

   @Bean
    public RateLimiter authRateLimiter() {
        return RateLimiter.of("authLimiter", RateLimiterConfig.custom()
                .limitForPeriod(5) // 5 requests allowed
                .limitRefreshPeriod(Duration.ofSeconds(30)) // refresh every 30 seconds
                .timeoutDuration(Duration.ofMillis(500)) // wait for a permit for up to 500 ms
                .build());
    }

   @Bean
   public DaoAuthenticationProvider authenticationProvider() {
       DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
       authProvider.setUserDetailsService(userDetailsService);
       authProvider.setPasswordEncoder(passwordEncoder());
       return authProvider;
   }

   @Bean
   public PasswordEncoder passwordEncoder() {
       return new BCryptPasswordEncoder(12);
   }

   @Bean
   public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
       return authConfig.getAuthenticationManager();
   }

   @Bean
   public CorsConfigurationSource corsConfigurationSource() {
       CorsConfiguration configuration = new CorsConfiguration();
       configuration.setAllowedOrigins(Arrays.asList(allowedOrigins));
       configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
       configuration.setAllowedHeaders(List.of("*"));
       configuration.setAllowCredentials(true);
       configuration.setMaxAge(3600L);

       UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
       source.registerCorsConfiguration("/**", configuration);
       return source;
   }

   @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity http, HandlerMappingIntrospector introspector) throws Exception {
       return http
           .csrf(AbstractHttpConfigurer::disable)
           .cors(cors -> cors.configurationSource(corsConfigurationSource()))
           .headers(headers -> headers
               .frameOptions(frame -> frame.sameOrigin())
               .contentSecurityPolicy(csp -> 
                   csp.policyDirectives("default-src 'self'; frame-ancestors 'self';")))
           .authorizeHttpRequests(req -> req
               .requestMatchers(WHITE_LIST_URL).permitAll()
               .anyRequest().authenticated())
           .exceptionHandling(ex -> ex
               .authenticationEntryPoint(unauthorizedHandler)
               .accessDeniedHandler(new CustomAccessDeniedHandler()))
           .sessionManagement(session -> 
               session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
           .authenticationProvider(authenticationProvider())
           .userDetailsService(userDetailsService)
           .addFilterBefore(authenticationJwtTokenFilter(), 
               UsernamePasswordAuthenticationFilter.class)
           .build();
   }
}
