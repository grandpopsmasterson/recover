package com.udacity.jwdnd.c1.review.dto.project;

import com.udacity.jwdnd.c1.review.dto.user.LongUser;
import com.udacity.jwdnd.c1.review.dto.floorplan.RoomDto;
import com.udacity.jwdnd.c1.review.dto.user.AssignedRoleDto;
import com.udacity.jwdnd.c1.review.model.enums.ProjectStage;
import com.udacity.jwdnd.c1.review.model.enums.ProjectType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public record LongProjectSummary(
   @NotBlank(message = "Project name is required")
   String name,
   
   @NotNull(message = "Start date is required")
   LocalDate startDate,

   @NotNull(message = "Loss date is required")
   LocalDate lossDate,

   String clientName,
   String clientEmail,
   String clientPhone,
   
   @NotEmpty(message = "At least one owner is required")
   List<LongUser> owners,

   Optional<List<AssignedRoleDto>> technicians,
   Optional<List<AssignedRoleDto>> editorIds,
   Optional<List<AssignedRoleDto>> viewerIds,
   
   @NotNull(message = "Project type is required")
   ProjectType projectType,

   ProjectStage stage,

   Optional<List<RoomDto>> rooms

) {}
