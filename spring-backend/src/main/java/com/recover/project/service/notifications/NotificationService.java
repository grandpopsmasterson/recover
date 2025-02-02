// package com.recover.project.service.notifications;

// import java.time.LocalDateTime;
// import java.util.List;
// import java.util.stream.Collectors;

// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;
// import org.springframework.messaging.simp.SimpMessagingTemplate;
// import org.springframework.stereotype.Service;

// import com.recover.project.dto.notification.NotificationDTO;
// import com.recover.project.model.Notification;
// import com.recover.project.model.enums.NotificationType;
// import com.recover.project.repository.NotificationRepository;

// import lombok.RequiredArgsConstructor;

// // NotificationService.java
// @Service
// @RequiredArgsConstructor
// public class NotificationService {
//     private final SimpMessagingTemplate messagingTemplate;
//     private final NotificationRepository notificationRepository;
    
//     public void createNotification(
//             String username, 
//             NotificationType type, 
//             String message, 
//             Long referenceId) {
        
//         Notification notification = new Notification();
//         notification.setRecipientUsername(username);
//         notification.setType(type);
//         notification.setMessage(message);
//         notification.setReferenceId(referenceId);
//         notification.setTimestamp(LocalDateTime.now());
        
//         notification = notificationRepository.save(notification);
        
//         messagingTemplate.convertAndSendToUser(
//             username,
//             "/queue/notifications",
//             NotificationDTO.toDto(notification)
//         );
//     }
    
//     public Page<NotificationDTO> getNotifications(String username, Pageable pageable) {
//         return notificationRepository
//             .findByRecipientUsernameOrderByTimestampDesc(username, pageable)
//             .map(NotificationDTO::toDto);
//     }
    
//     public List<NotificationDTO> getRecentNotifications(String username) {
//         return notificationRepository
//             .findTop10ByRecipientUsernameOrderByTimestampDesc(username)
//             .stream()
//             .map(NotificationDTO::fromEntity)
//             .collect(Collectors.toList());
//     }
    
//     public long getUnreadCount(String username) {
//         return notificationRepository.countByRecipientUsernameAndReadFalse(username);
//     }
    
//     public void markAsRead(Long notificationId, String username) {
//         notificationRepository.findById(notificationId)
//             .filter(n -> n.getRecipientUsername().equals(username))
//             .ifPresent(notification -> {
//                 notification.setRead(true);
//                 notificationRepository.save(notification);
//             });
//     }
// }

