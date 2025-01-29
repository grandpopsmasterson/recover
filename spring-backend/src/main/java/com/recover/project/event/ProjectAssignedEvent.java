package com.recover.project.event;

import org.springframework.context.ApplicationEvent;

import com.recover.project.dto.project.ShortProjectDto;
import com.recover.project.dto.user.AssignedRoleDto;


public class ProjectAssignedEvent extends ApplicationEvent {

    private final ShortProjectDto project;
    private final AssignedRoleDto employee;
    
        public ProjectAssignedEvent(Object source, ShortProjectDto project, AssignedRoleDto employee) {
            super(source);
            this.project = project;
            this.employee = employee;
    }

    public ShortProjectDto getProject() {
        return project;
    }

    public AssignedRoleDto getEmployee() {
        return employee;
    }
}
