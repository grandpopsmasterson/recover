package com.recover.project.controller.notifications;

import java.security.Principal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recover.project.dto.notification.NotificationDTO;
import com.recover.project.service.notifications.NotificationService;

import lombok.RequiredArgsConstructor;

// NotificationController.java
@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    
    @GetMapping
    public ResponseEntity<Page<NotificationDTO>> getNotifications(
            Principal principal,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(
            notificationService.getNotifications(principal.getName(), pageable)
        );
    }
    
    @GetMapping("/recent-activity")
    public ResponseEntity<List<NotificationDTO>> getRecentNotifications(Principal principal) {
        return ResponseEntity.ok(
            notificationService.getRecentNotifications(principal.getName())
        );
    }
    
    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadCount(Principal principal) {
        return ResponseEntity.ok(
            notificationService.getUnreadCount(principal.getName())
        );
    }
    
    @PatchMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(
            @PathVariable Long id,
            Principal principal) {
        notificationService.markAsRead(id, principal.getName());
        return ResponseEntity.ok().build();
    }
}
