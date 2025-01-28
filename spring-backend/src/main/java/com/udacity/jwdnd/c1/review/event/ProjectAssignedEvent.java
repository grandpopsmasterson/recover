package com.udacity.jwdnd.c1.review.event;

import org.springframework.context.ApplicationEvent;

import com.udacity.jwdnd.c1.review.model.Role;

public class ProjectAssignedEvent extends ApplicationEvent {
    private final Long projectId;
    private final Long userId;

    public ProjectAssignedEvent(Role role, Long projectId, Long userId) {
        super(role);
        this.projectId = projectId;
        this.userId = userId;
    }

    public Long getProjectId() {
        return projectId;
    }

    public Long getUserId() {
        return userId;
    }
    
}
