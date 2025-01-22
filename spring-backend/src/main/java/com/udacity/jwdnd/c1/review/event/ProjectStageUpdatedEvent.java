package com.udacity.jwdnd.c1.review.event;
import lombok.Data;

@Data
public class ProjectStageUpdatedEvent {
    private Long projectId;
    private Integer stage;

    public ProjectStageUpdatedEvent(Long projectId, Integer stage) {
        this.projectId = projectId;
        this.stage = stage;
    }

    public Long getProjectId() {
        return projectId;
    }

    public Integer getStage() {
        return stage;
    }
}
