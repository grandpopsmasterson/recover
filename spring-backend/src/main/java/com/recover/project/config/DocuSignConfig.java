// package com.recover.project.config;

// import java.io.IOException;
// import java.nio.file.Files;
// import java.nio.file.Paths;
// import java.util.ArrayList;
// import java.util.List;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import com.docusign.esign.client.ApiClient;
// import com.docusign.esign.client.ApiException;
// import com.docusign.esign.client.auth.OAuth;

// @Configuration
// public class DocuSignConfig {
//     @Value("${docusign.client-id}")
//     private String clientId;

//     @Value("${docusign.account-id}")
//     private String accountId;

//     @Value("${docusign.private-key-path}")
//     private String privateKeyPath;

//     @Bean
//     public ApiClient docuSignApiClient() throws IOException, ApiException {
//         // Create ApiClient manually to avoid automatic HTTP client creation
//         ApiClient apiClient = new ApiClient("https://demo.docusign.net/restapi");
        
//         // Read private key
//         byte[] privateKeyBytes = Files.readAllBytes(Paths.get(privateKeyPath));

//         // Define scopes
//         List<String> scopes = new ArrayList<>();
//         scopes.add(OAuth.Scope_SIGNATURE);
//         scopes.add(OAuth.Scope_IMPERSONATION);

//         // Request JWT token
//         OAuth.OAuthToken authToken = apiClient.requestJWTUserToken(
//             clientId, 
//             accountId, 
//             scopes, 
//             privateKeyBytes, 
//             3600L
//         );

//         // Set access token
//         apiClient.setAccessToken(authToken.getAccessToken(), authToken.getExpiresIn());

//         return apiClient;
//     }
// }