package com.udacity.jwdnd.c1.review.event;

import org.springframework.context.ApplicationEvent;

import com.udacity.jwdnd.c1.review.dto.project.ProjectResponse;
import com.udacity.jwdnd.c1.review.dto.response.role.UserDTO;

public class checkInEvent extends ApplicationEvent {
    private final ProjectResponse project;
    private final UserDTO technician;
    
        public checkInEvent(Object source, ProjectResponse project, UserDTO technician) {
            super(source);
            this.project = project;
            this.technician = technician;
    }

    public ProjectResponse getProject() {
        return project;
    }

    public UserDTO getTechnician() {
        return technician;
    }

    public String getLocation() {
        return project.getAddress();
    }
}
