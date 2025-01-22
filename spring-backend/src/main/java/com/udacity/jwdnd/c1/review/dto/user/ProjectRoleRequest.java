package com.udacity.jwdnd.c1.review.dto.user;

import com.udacity.jwdnd.c1.review.dto.BaseDTO;
import com.udacity.jwdnd.c1.review.model.enums.ProjectRole;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Builder
@Getter @Setter
public class ProjectRoleRequest extends BaseDTO {

    // for assigning users to a project
    private Long projectId;
    private Long userId;
    private ProjectRole projectRole;
} 
