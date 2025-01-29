package com.udacity.jwdnd.c1.review.event;

import org.springframework.context.ApplicationEvent;

import com.udacity.jwdnd.c1.review.dto.project.ShortProjectDto;
import com.udacity.jwdnd.c1.review.dto.user.AssignedRoleDto;

public class ProjectCreatedEvent extends ApplicationEvent {
    private final ShortProjectDto project;
    private final AssignedRoleDto employee;
    
        public ProjectCreatedEvent(Object source, ShortProjectDto project, AssignedRoleDto employee) {
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
