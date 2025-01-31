package com.recover.project.model.enums;

public enum NotificationType {
    PROJECT_ASSIGNED("project"),
    PROJECT_CREATED("project"),
    REQUEST_SUBMITTED("request"),
    APPROVAL_RECEIVED("approval"),
    COMMENT_ADDED("comment"),
    TECHNICIAN_CHECKIN("project");

    private final String entityType;

    NotificationType(String entityType) {
        this.entityType = entityType;
    }

    public String getEntityType() {
        return entityType;
    }
}