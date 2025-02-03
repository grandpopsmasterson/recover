package com.recover.project.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

import com.recover.project.model.enums.NotificationType;

@Entity
@Table(name = "notifications")
@Data
@Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "message")
    private String message;

    @Column(name = "notification_type")
    @Enumerated(EnumType.STRING)
    private NotificationType type;

    @Column(name = "timestamp")
    private LocalDateTime timestamp;
    
    @Column(name = "reference_id")
    private Long referenceId;

    @Column(name = "recipient_username")
    private String recipientUsername;

    @Column(name = "read")
    private boolean read;

}

