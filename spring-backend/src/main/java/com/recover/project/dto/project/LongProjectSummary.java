package com.recover.project.dto.project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.recover.project.dto.floorplan.RoomDto;
import com.recover.project.dto.user.AssignedRoleDto;
import com.recover.project.dto.user.LongUser;
import com.recover.project.model.enums.ProjectStage;
import com.recover.project.model.enums.ProjectType;

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
