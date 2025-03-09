package com.recover.project.event;

import org.springframework.context.ApplicationEvent;

import com.recover.project.dto.project.ProjectDto;
import com.recover.project.model.enums.ProjectStage;

import lombok.Data;

@Data
public class ProjectStageUpdatedEvent extends ApplicationEvent {
    private final ProjectDto project;
    private final ProjectStage stage;
    
        public ProjectStageUpdatedEvent(Object source, ProjectDto project, ProjectStage stage) {
            super(source);
            this.project = project;
            this.stage = stage;
    }

    public ProjectDto getProject() {
        return project;
    }

    public ProjectStage getStage() {
        return stage;
    }
}
