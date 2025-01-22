package com.udacity.jwdnd.c1.review.event;

import org.springframework.context.ApplicationEvent;

public class ProjectCreatedEvent extends ApplicationEvent {
    private final Long projectId;
    private final String projectName;
    private final String username;

    public ProjectCreatedEvent(Long projectId, String projectName, String username) {
        super(projectId);
        this.projectId = projectId;
        this.projectName = projectName;
        this.username = username;
    }

    public Long getProjectId() {
        return projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getUsername() {
        return username;
    }
}
