package com.recover.project.dto.project;

import java.util.List;

import com.recover.project.dto.user.AssignedRoleDto;
import com.recover.project.model.enums.ProjectStage;

public record ShortProjectDto(
   String streetAddress,
   String clientName,
   List<AssignedRoleDto> assignedRoles,
   ProjectStage stage
) {}