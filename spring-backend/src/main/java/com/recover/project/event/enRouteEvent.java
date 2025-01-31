package com.recover.project.event;

import org.springframework.context.ApplicationEvent;

import com.recover.project.dto.project.ShortProjectDto;
import com.recover.project.dto.user.ShortUser;


public class enRouteEvent extends ApplicationEvent {
    private final ShortProjectDto project;
    private final ShortUser client;
    
        public enRouteEvent(Object source, ShortProjectDto project, ShortUser client) {
            super(source);
            this.project = project;
            this.client = client;
    }

    public ShortProjectDto getProject() {
        return project;
    }

    public ShortUser getClient() {
        return client;
    }
}
