package com.udacity.jwdnd.c1.review.service.email;

import java.io.IOException;

import com.udacity.jwdnd.c1.review.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;


@Service
public class EmailService {
    private final SendGrid sendGrid;
    private final String fromEmail;

    public EmailService(
        @Autowired SendGrid sendGrid,
        @Value("${twilio.sengrid.from-email}") String fromEmail
    ) {
        this.sendGrid = sendGrid;
        this.fromEmail = fromEmail;
    }

    public void sendAccountCreationEmail(User user) {
        Email from = new Email(this.fromEmail);
        String subject = "Account Creation";
        Email to = new Email(user.getEmail());
        Content content = new Content("text/plain", "this app is running.");

        Mail mail = new Mail(from, subject, to, content);

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
