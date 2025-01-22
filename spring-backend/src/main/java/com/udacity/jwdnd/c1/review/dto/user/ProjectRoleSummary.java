package com.udacity.jwdnd.c1.review.dto.user;

import com.google.cloud.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectRoleSummary {

    // for displaying users assigned to a project
    private Long id;
    private String shortName;  // "Joey B"
    private String profileImageUrl;
    private Role role;
    private boolean isAvailable;
}
