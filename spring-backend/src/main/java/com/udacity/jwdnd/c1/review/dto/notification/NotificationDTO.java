package com.udacity.jwdnd.c1.review.dto.notification;

import java.time.LocalDateTime;

import com.udacity.jwdnd.c1.review.model.enums.NotificationType;

import lombok.Data;

@Data
public class NotificationDTO {
    private String message;
    private NotificationType type;
    private LocalDateTime timestamp;
    private Long projectId;
    // Add any other relevant fields
}
