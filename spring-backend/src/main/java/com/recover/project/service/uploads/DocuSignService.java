// package com.recover.project.service.uploads;

// import java.time.format.DateTimeFormatter;
// import java.util.Arrays;
// import java.util.UUID;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Service;
// import com.recover.project.model.Project;

// import com.docusign.esign.api.EnvelopesApi;
// import com.docusign.esign.client.ApiClient;
// import com.docusign.esign.client.ApiException;
// import com.docusign.esign.model.*;

// @Service
// public class DocuSignService {
//     @Value("${docusign.account-id}")
//     private String accountId;

//     @Value("${docusign.template-id}")
//     private String templateId;

//     public Tabs createWorkAuthorizationTabs(Project project) {
//         Tabs tabs = new Tabs();

//         // Property Details
//         tabs.textTabs(Arrays.asList(
//             new Text()
//                 .tabLabel("project_name")
//                 .value(project.getProjectName()),
            
//             new Text()
//                 .tabLabel("client_name")
//                 .value(project.getClientName()),
            
//             new Text()
//                 .tabLabel("street_address")
//                 .value(project.getStreetAddress()),
            
//             new Text()
//                 .tabLabel("city_state_zip")
//                 .value(String.format("%s, %s %s", 
//                     project.getCity(), 
//                     project.getState(), 
//                     project.getZipcode())),
            
//             new Text()
//                 .tabLabel("client_phone")
//                 .value(project.getClientPhone()),
            
//             new Text()
//                 .tabLabel("client_email")
//                 .value(project.getClientEmail()),
            
//             new Text()
//                 .tabLabel("loss_date")
//                 .value(project.getLossDate().format(DateTimeFormatter.ofPattern("MM/dd/yyyy"))),
            
//             new Text()
//                 .tabLabel("loss_type")
//                 .value(project.getLossType().toString()),
            
//             new Text()
//                 .tabLabel("claim_number")
//                 .value(project.getClaimNumber()),
            
//             new Text()
//                 .tabLabel("carrier")
//                 .value(project.getCarrier())
//         ));

//         // Signature Tabs
//         tabs.signHereTabs(Arrays.asList(
//             new SignHere()
//                 .documentId("1")
//                 .pageNumber("1")
//                 .tabLabel("client_signature"),
            
//             new SignHere()
//                 .documentId("1")
//                 .pageNumber("1")
//                 .tabLabel("company_signature")
//         ));

//         // Date Signed Tabs
//         tabs.dateSignedTabs(Arrays.asList(
//             new DateSigned()
//                 .documentId("1")
//                 .pageNumber("1")
//                 .tabLabel("date_signed")
//         ));

//         // Checkbox Tabs
//         tabs.checkboxTabs(Arrays.asList(
//             new Checkbox()
//                 .tabLabel("authorize_work")
//                 .selected("false"),
            
//             new Checkbox()
//                 .tabLabel("understand_terms")
//                 .selected("false")
//         ));

//         return tabs;
//     }

//     public EnvelopeDefinition createWorkAuthorizationEnvelope(Project project) {
//         // Create envelope definition
//         EnvelopeDefinition envelope = new EnvelopeDefinition();
        
//         // Create recipient
//         Recipients recipients = new Recipients();
        
//         // Create a single recipient (client)
//         Signer signer = new Signer()
//             .name(project.getClientName())
//             .email(project.getClientEmail())
//             .roleName("Client")
//             .tabs(createWorkAuthorizationTabs(project));
        
//         recipients.signers(Arrays.asList(signer));
        
//         // Configure envelope
//         envelope.recipients(recipients)
//             .templateId(templateId)
//             .setStatus("sent");

//         return envelope;
//     }

//     public String sendEnvelopeFromTemplate(Project project, ApiClient apiClient) throws ApiException {
//         // Create envelopes API instance
//         EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
        
//         // Create envelope definition
//         EnvelopeDefinition envelopeDefinition = createWorkAuthorizationEnvelope(project);
        
//         // Send envelope
//         EnvelopeSummary envelopeSummary = envelopesApi.createEnvelope(accountId, envelopeDefinition);
        
//         return envelopeSummary.getEnvelopeId();
//     }

//     public String getSigningUrl(String envelopeId, ApiClient apiClient, Project project) throws ApiException {
//         EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
        
//         // Generate a more predictable client user ID
//         String clientUserId = "project_" + project.getId() + "_" + UUID.randomUUID().toString();

//         RecipientViewRequest viewRequest = new RecipientViewRequest()
//             .returnUrl("https://recover.systems/project/complete")
//             .authenticationMethod("email")
//             .email(project.getClientEmail())
//             .userName(project.getClientName())
//             .clientUserId(clientUserId);

//         ViewUrl viewUrl = envelopesApi.createRecipientView(accountId, envelopeId, viewRequest);
//         return viewUrl.getUrl();
//     }
// }