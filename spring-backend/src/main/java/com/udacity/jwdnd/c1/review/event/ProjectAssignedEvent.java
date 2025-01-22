package com.udacity.jwdnd.c1.review.event;

import org.springframework.context.ApplicationEvent;

public class ProjectAssignedEvent extends ApplicationEvent {
    private final Long projectId;
    private final String projectName;
    private final String technicianUsername;

    public ProjectAssignedEvent(Object source, Long projectId, String projectName, String technicianUsername) {
        super(source);
        this.projectId = projectId;
        this.projectName = projectName;
        this.technicianUsername = technicianUsername;
    }

    public Long getProjectId() {
        return projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getTechnicianUsername() {
        return technicianUsername;
    }
    
}
