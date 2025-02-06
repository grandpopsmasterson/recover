package com.recover.project.service.email;

import java.io.IOException;
import java.util.Optional;

import com.recover.project.model.Project;
import com.recover.project.model.User;
import com.recover.project.dto.project.LongProjectDto;
import com.recover.project.service.project.ProjectService;
import com.recover.project.service.roles.UserService;
import com.recover.project.utils.exceptions.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;

@Service

public class EmailService {
    private final UserService userService;
    private final SendGrid sendGrid;
    private final String fromEmail;
    private final String baseURL;

    public EmailService (
        UserService userService,
        @Value("#{environment.SENDGRID_API_KEY}") String sendGridApiKey,
        @Value("#{environment.SENDGRID_FROM_EMAIL}") String fromEmail,
        @Value("#{environment.baseURL}") String baseURL
    ) {
        this.userService = userService;
        this.sendGrid = new SendGrid(sendGridApiKey);
        this.fromEmail = fromEmail;
        this.baseURL = baseURL;
    }

    public void sendAccountCreationEmail(User user) {
        Email from = new Email(this.fromEmail);
        String subject = "Account Creation";
        Email to = new Email(user.getEmail());
        Mail mail = new Mail();
        // String unsubscribe = user.createUnsubscribeLink();
        mail.setFrom(from);
        mail.setSubject(subject);
        mail.setTemplateId("d-8dae52673a77490da1538ba17b093a09");

        Personalization personalization = new Personalization();
        personalization.setFrom(from);
        personalization.setSubject(subject);
        personalization.addTo(to);
        personalization.addDynamicTemplateData("first_name", user.getFirstName());
        personalization.addDynamicTemplateData("last_name", user.getLastName());
        // personalization.addDynamicTemplateData("unsubscribe", unsubscribe);

        mail.addPersonalization(personalization);
        sendMail(mail);
    }

    public void sendAccountDeletionEmail(User user) {
        Email from = new Email(this.fromEmail);
        String subject = "Account Deletion";
        Email to = new Email(user.getEmail());
        String confirm_deletion_link = this.baseURL + "/api/v1/users" + user.getId();
        Mail mail = new Mail();
        mail.setFrom(from);
        mail.setSubject(subject);
        mail.setTemplateId(null);

        Personalization personalization = new Personalization();
        personalization.setFrom(from);
        personalization.setSubject(subject);
        personalization.addTo(to);
        personalization.addDynamicTemplateData("confirm_deletion_link", confirm_deletion_link);
        personalization.addDynamicTemplateData("first_name", user.getFirstName());
        personalization.addDynamicTemplateData("last_name", user.getLastName());

        mail.addPersonalization(personalization);
        sendMail(mail);
    }

    public void sendPasswordResetEmail(User user, String token) {
        Email from = new Email(this.fromEmail);
        String subject = "Password Reset";
        Email to = new Email(user.getEmail());
        Mail mail = new Mail();
        String resetLink = this.baseURL + "/reset-password?token=" + token;
        mail.setFrom(from);
        mail.setSubject(subject);
        mail.setTemplateId("d-4b35c6e010654b92ba867cf6d35fd61d");

        Personalization personalization = new Personalization();
        personalization.setFrom(from);
        personalization.setSubject(subject);
        personalization.addTo(to);
        personalization.addDynamicTemplateData("reset_link", resetLink);
        personalization.addDynamicTemplateData("first_name", user.getFirstName());
        personalization.addDynamicTemplateData("last_name", user.getLastName());

        mail.addPersonalization(personalization);
        sendMail(mail);
    }

    public void sendProjectCreationEmail(Project project) {
        User user = userService.findByEmail(project.getClientEmail()).orElseThrow(() ->
            new ResourceNotFoundException("User not found for this Project")
        );
        Email from = new Email(this.fromEmail);
        String subject = "Your Project with Recover Systems";
        Email to = new Email(user.getEmail());
        Mail mail = new Mail();
        mail.setFrom(from);
        mail.setSubject(subject);
        mail.setTemplateId(null);

        Personalization personalization = new Personalization();
        personalization.setFrom(from);
        personalization.setSubject(subject);
        personalization.addTo(to);
        personalization.addDynamicTemplateData("project", project);
        personalization.addDynamicTemplateData("first_name", user.getFirstName());
        personalization.addDynamicTemplateData("last_name", user.getLastName());

        mail.addPersonalization(personalization);
        sendMail(mail);
    }

    private void sendMail(Mail mail) {
        try {
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sendGrid.api(request);
            int statusCode = response.getStatusCode();
            if (statusCode < 200 || statusCode >= 300) {
                throw new RuntimeException(response.getBody());
            }

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }
}
