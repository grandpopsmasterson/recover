package com.recover.project.event;

import org.springframework.context.ApplicationEvent;

import com.recover.project.dto.project.ProjectDto;
import com.recover.project.dto.user.AssignedRoleDto;


public class checkInEvent extends ApplicationEvent {
    private final ProjectDto project;
    private final AssignedRoleDto technician;
    
        public checkInEvent(Object source, ProjectDto project, AssignedRoleDto technician) {
            super(source);
            this.project = project;
            this.technician = technician;
    }

    public ProjectDto getProject() {
        return project;
    }

    public AssignedRoleDto getTechnician() {
        return technician;
    }

    public String getLocation() {
        return project.streetAddress();
    }
}
