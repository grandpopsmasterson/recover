package com.recover.project.dto.user;

import com.recover.project.model.enums.ProjectRole;

public record AssignedRoleDto (
// for displaying users assigned to a project
    Long id,
    String shortName,  // "Joey B"
    String profileImageUrl,
    ProjectRole projectRole,
    boolean isAvailable
) {}

    

