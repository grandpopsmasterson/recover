package com.recover.project.event;

import org.springframework.context.ApplicationEvent;

import com.recover.project.dto.project.ShortProjectDto;
import com.recover.project.dto.user.AssignedRoleDto;


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
