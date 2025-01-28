package com.udacity.jwdnd.c1.review.dto.project;

import java.util.List;

import com.udacity.jwdnd.c1.review.dto.user.AssignedRoleDto;
import com.udacity.jwdnd.c1.review.model.enums.ProjectStage;

public record ShortProjectDto(
   String streetAddress,
   String clientName,
   List<AssignedRoleDto> assignedUsers,
   ProjectStage stage
) {}