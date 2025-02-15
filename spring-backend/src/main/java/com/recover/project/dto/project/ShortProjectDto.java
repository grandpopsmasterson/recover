package com.recover.project.dto.project;

import java.util.List;

import com.recover.project.dto.user.AssignedRoleDto;

public record ShortProjectDto(
   Long id,
   String streetAddress,
   String clientName,
   List<AssignedRoleDto> assignedRoles,
   String city,
   String state
) {}