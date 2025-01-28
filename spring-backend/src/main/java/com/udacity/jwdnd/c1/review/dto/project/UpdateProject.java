package com.udacity.jwdnd.c1.review.dto.project;

import com.udacity.jwdnd.c1.review.model.enums.ProjectStage;

public record UpdateProject(
   String name,
   String description,
   ProjectStage stage
) {}