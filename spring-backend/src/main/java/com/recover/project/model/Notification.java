package com.recover.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

import com.recover.project.model.enums.NotificationType;

@Entity
@Table(name = "notifications")
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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

    @Column(name = "recipient_user")
    private String recipientUser;

    @Column(name = "read")
    private boolean isRead = false;

}

