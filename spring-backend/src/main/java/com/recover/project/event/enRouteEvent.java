package com.recover.project.event;

import org.springframework.context.ApplicationEvent;

import com.recover.project.dto.project.ProjectDto;
import com.recover.project.dto.user.ShortUser;


public class enRouteEvent extends ApplicationEvent {
    private final ProjectDto project;
    private final ShortUser client;
    
        public enRouteEvent(Object source, ProjectDto project, ShortUser client) {
            super(source);
            this.project = project;
            this.client = client;
    }

    public ProjectDto getProject() {
        return project;
    }

    public ShortUser getClient() {
        return client;
    }
}
