package com.recover.project.listener;

// import org.springframework.context.event.EventListener;
// import org.springframework.stereotype.Component;

// import com.recover.project.event.ProjectAssignedEvent;
// import com.recover.project.event.ProjectCreatedEvent;
// import com.recover.project.event.checkInEvent;
// import com.recover.project.model.enums.NotificationType;
// import com.recover.project.service.notifications.NotificationService;
// import com.recover.project.service.project.ProjectService;

// import lombok.RequiredArgsConstructor;

// @Component
// @RequiredArgsConstructor
// public class ProjectEventListener {
//     private final NotificationService notificationService;
//     private final ProjectService projectService;

//     @EventListener
//     public void onProjectAssigned(ProjectAssignedEvent event) {
//         notificationService.createNotification(
//             event.getUserId(),
//             NotificationType.PROJECT_ASSIGNED,
//             "New project assigned: " + event.getProjectId(),
//             event.getProjectId()  // referenceId points to the project
//         );
//     }

//     @EventListener
//     public void onProjectCreated(ProjectCreatedEvent event) {
//         notificationService.createNotification(
//             event.getUsername(),
//             NotificationType.PROJECT_CREATED,
//             "New project created: " + event.getProjectName(),
//             event.getProjectId()  // referenceId points to the project
//         );
//     }

//     @EventListener
//     public void onTechnicianCheckin(checkInEvent event) {
//         String projectManager = projectService.getProjectManagerForProject(event.getProjectId());
//         notificationService.notifyProjectManager(
//             projectManager,
//             NotificationType.TECHNICIAN_CHECKIN,
//             "Technician checked in at " + event.getLocation(),
//             event.getProjectId()
//         );
//     }

    
//     /*@EventListener
//     public void onCommentAdded(CommentAddedEvent event) {
//         notificationService.createNotification(
//             event.getRecipientUsername(),
//             NotificationType.COMMENT_ADDED,
//             "New comment on " + event.getEntityType() + ": " + event.getPreview(),
//             event.getCommentId()  // referenceId points to the comment
//         );
//     } */
    
// }
