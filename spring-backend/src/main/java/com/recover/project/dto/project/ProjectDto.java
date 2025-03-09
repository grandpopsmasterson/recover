package com.recover.project.dto.project;

import java.time.LocalDate;
import java.util.List;
import com.recover.project.model.enums.ProjectStage;
import com.recover.project.model.enums.ProjectType;
import com.recover.project.model.enums.LossType;
import com.recover.project.model.enums.Scope;
import com.recover.project.dto.user.AssignedRoleDto;

public record ProjectDto(
   Long id,
   ProjectStage stage,
   Scope scope,
   LossType lossType,
   ProjectType projectType,
   String carrier,
   String streetAddress,
   String clientName,
   List<AssignedRoleDto> assignedRoles,
   LocalDate lossDate,
   LocalDate receivedDate,
   LocalDate startDate,
   String city,
   String state
) {}