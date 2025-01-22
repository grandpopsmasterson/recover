package com.udacity.jwdnd.c1.review.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import com.udacity.jwdnd.c1.review.model.enums.NotificationType;

@Entity
@Table(name = "notifications")
@Getter @Setter
@NoArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String message;
    
    @Enumerated(EnumType.STRING)
    private NotificationType type;
    
    private LocalDateTime timestamp;
    
    private Long referenceId;
    
    private String recipientUsername;

    private boolean isRead = false;

}

