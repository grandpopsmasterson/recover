package com.udacity.jwdnd.c1.review.event;

import org.springframework.context.ApplicationEvent;

import com.udacity.jwdnd.c1.review.model.User;

public class enRouteEvent extends ApplicationEvent {
    private final Long projectId;
    private final User homeowner;
    
        public enRouteEvent(Object source, Long projectId, User homeowner) {
            super(source);
            this.projectId = projectId;
            this.homeowner = homeowner;
    }

    public Long getProjectId() {
        return projectId;
    }

    public User getHomeowner() {
        return homeowner;
    }
}
