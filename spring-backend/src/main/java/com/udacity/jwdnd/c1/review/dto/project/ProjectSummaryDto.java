package com.udacity.jwdnd.c1.review.dto.project;

import java.time.LocalDate;
import java.util.List;

import com.udacity.jwdnd.c1.review.dto.floorplan.FloorplanDto;
import com.udacity.jwdnd.c1.review.dto.user.AssignedRoleDto;
import com.udacity.jwdnd.c1.review.model.enums.ProjectStage;
import com.udacity.jwdnd.c1.review.model.enums.ProjectType;

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
    private FloorplanDto floorplanDto;
}
