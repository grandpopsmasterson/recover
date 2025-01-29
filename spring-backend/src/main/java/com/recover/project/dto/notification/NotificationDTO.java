package com.recover.project.dto.notification;

import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.type.ReferenceType;
import com.recover.project.model.enums.NotificationType;

import lombok.Data;

@Data
public class NotificationDTO {
    private String message;
    private NotificationType type;
    private LocalDateTime timestamp;
    private ReferenceType referenceType;
    private Long referenceId;
    // Add any other relevant fields
}
