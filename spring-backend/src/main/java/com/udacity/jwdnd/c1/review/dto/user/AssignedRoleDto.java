package com.udacity.jwdnd.c1.review.dto.user;

import com.udacity.jwdnd.c1.review.model.enums.ProjectRole;

public record AssignedRoleDto (
// for displaying users assigned to a project
    Long id,
    String shortName,  // "Joey B"
    String profileImageUrl,
    ProjectRole projectRole,
    boolean isAvailable
) {}

    

