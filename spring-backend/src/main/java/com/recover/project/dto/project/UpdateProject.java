package com.recover.project.dto.project;

import com.recover.project.model.enums.ProjectStage;

public record UpdateProject(
   String name,
   String description,
   ProjectStage stage
) {}