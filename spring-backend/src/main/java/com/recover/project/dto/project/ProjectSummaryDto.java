package com.recover.project.dto.project;

import java.time.LocalDate;
import java.util.List;

import com.recover.project.dto.user.AssignedRoleDto;
import com.recover.project.model.enums.ProjectStage;
import com.recover.project.model.enums.ProjectType;

import lombok.Data;

@Data
public class ProjectSummaryDto {
    private Long id;
    private String projectName;
    private String clientName;
    private String clientEmail;
    private String clientPhone;
    private LocalDate startDate;
    private LocalDate lossDate;
    private String streetAddress;
    private String city;
    private String state;
    private String zipcode;
    private ProjectStage stage;
    private ProjectType projectType;
    private String carrier;
    private List<AssignedRoleDto> assignedRoles;
}
