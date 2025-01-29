package com.recover.project.dto.user;



import com.recover.project.dto.BaseDTO;
import com.recover.project.model.enums.ProjectRole;

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
