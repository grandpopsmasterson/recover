package com.udacity.jwdnd.c1.review.event;

import org.springframework.context.ApplicationEvent;

import com.udacity.jwdnd.c1.review.dto.project.ShortProjectDto;
import com.udacity.jwdnd.c1.review.dto.user.AssignedRoleDto;


public class checkInEvent extends ApplicationEvent {
    private final ShortProjectDto project;
    private final AssignedRoleDto technician;
    
        public checkInEvent(Object source, ShortProjectDto project, AssignedRoleDto technician) {
            super(source);
            this.project = project;
            this.technician = technician;
    }

    public ShortProjectDto getProject() {
        return project;
    }

    public AssignedRoleDto getTechnician() {
        return technician;
    }

    public String getLocation() {
        return project.streetAddress();
    }
}
