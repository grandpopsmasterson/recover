package com.udacity.jwdnd.c1.review.dto.project;

import lombok.Data;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

import com.udacity.jwdnd.c1.review.dto.user.ProjectRoleRequest;
import com.udacity.jwdnd.c1.review.model.enums.ProjectType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;


@Data
@Builder
public class CreateProject {
    @NotBlank(message = "Project name is required")
    private String name;
    
    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "Loss date is required")
    private LocalDate lossDate;
    
    @NotEmpty(message = "At least one owner is required")
    private List<ProjectRoleRequest> owners;

    private List<ProjectRoleRequest> technicians;
    
    private List<ProjectRoleRequest> editorIds;
    
    private List<ProjectRoleRequest> viewerIds;
    
    @NotNull(message = "Project type is required")
    private ProjectType projectType;
    
    private String clientName;
    private String clientEmail;
    private String clientPhone;
}

