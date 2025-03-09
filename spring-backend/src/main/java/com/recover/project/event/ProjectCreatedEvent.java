package com.recover.project.event;

import org.springframework.context.ApplicationEvent;

import com.recover.project.dto.project.ProjectDto;
import com.recover.project.dto.user.AssignedRoleDto;


public class ProjectCreatedEvent extends ApplicationEvent {
    private final ProjectDto project;
    private final AssignedRoleDto employee;
    
        public ProjectCreatedEvent(Object source, ProjectDto project, AssignedRoleDto employee) {
            super(source);
            this.project = project;
            this.employee = employee;
    }

    public ProjectDto getProject() {
        return project;
    }

    public AssignedRoleDto getEmployee() {
        return employee;
    }
}
