package com.recover.project.service.email;

import java.io.IOException;

import com.recover.project.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
// import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;

@Service
public class EmailService {
    private final SendGrid sendGrid;
    private final String fromEmail;

    public EmailService(
        @Value("${twilio.sendgrid.api-key}") String sendGridApiKey,
        @Value("${twilio.sendgrid.from-email}") String fromEmail
    ) {
        this.sendGrid = new SendGrid(sendGridApiKey);
        this.fromEmail = fromEmail;
    
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

    public void sendPasswordRecoveryEmail(User user) {
        Email from = new Email(this.fromEmail);
        String subject = "Password Reset";
        Email to = new Email(user.getEmail());
        Mail mail = new Mail();
        RecoveryLink recoveryLink = RecoveryService.generateRecoveryLink(user);
        mail.setFrom(from);
        mail.setSubject(subject);
        mail.setTemplateId("d-4b35c6e010654b92ba867cf6d35fd61d");

        Personalization personalization = new Personalization();
        personalization.setFrom(from);
        personalization.setSubject(subject);
        personalization.addTo(to);

        personalization.addDynamicTemplateData("reset_link", recoveryLink);
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
