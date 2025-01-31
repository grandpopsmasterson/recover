package com.recover.project.event;

import org.springframework.context.ApplicationEvent;

import com.recover.project.dto.project.ShortProjectDto;
import com.recover.project.model.enums.ProjectStage;

import lombok.Data;

@Data
public class ProjectStageUpdatedEvent extends ApplicationEvent {
    private final ShortProjectDto project;
    private final ProjectStage stage;
    
        public ProjectStageUpdatedEvent(Object source, ShortProjectDto project, ProjectStage stage) {
            super(source);
            this.project = project;
            this.stage = stage;
    }

    public ShortProjectDto getProject() {
        return project;
    }

    public ProjectStage getStage() {
        return stage;
    }
}
