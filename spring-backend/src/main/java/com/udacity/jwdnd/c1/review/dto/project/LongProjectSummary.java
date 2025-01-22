package com.udacity.jwdnd.c1.review.dto.project;

import com.udacity.jwdnd.c1.review.dto.user.LongUser;
import com.udacity.jwdnd.c1.review.dto.user.ProjectRoleRequest;
import com.udacity.jwdnd.c1.review.model.enums.ProjectStage;
import com.udacity.jwdnd.c1.review.model.enums.ProjectType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import lombok.Data;

@Data
public class LongProjectSummary {
    @NotBlank(message = "Project name is required")
    private String name;
    
    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "Loss date is required")
    private LocalDate lossDate;
    
    @NotEmpty(message = "At least one owner is required")
    private List<LongUser> owners;

    private Optional<List<LongUser>> technicians;
    
    private Optional<List<LongUser>> editorIds;
    
    private Optional<List<LongUser>> viewerIds;
    
    @NotNull(message = "Project type is required")
    private ProjectType projectType;

    private ProjectStage stage;
    
    private String clientName;
    private String clientEmail;
    private String clientPhone;
}

