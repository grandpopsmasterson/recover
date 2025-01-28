package com.udacity.jwdnd.c1.review.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.udacity.jwdnd.c1.review.dto.project.ProjectSummaryDto;
import com.udacity.jwdnd.c1.review.model.Project;


@Mapper(componentModel = "spring", uses = {RoleMapper.class, FloorplanMapper.class})
public interface ProjectMapper {

    @Mapping(source = "roles", target = "assignedRoles")  // assigned roles is a dto that was packaged and passed in from RoleMapper
    ProjectSummaryDto toSummaryDto(Project project);

    List<ProjectSummaryDto> toSummaryDtoList(List<Project> projects);

    default String getFullAddress(Project project) {
        return String.format("%s%s%s %s",
            project.getStreetAddress() != null ? project.getStreetAddress() + ", " : "",
            project.getCity() != null ? project.getCity() + ", " : "",
            project.getState() != null ? project.getState() : "",
            project.getZipcode() != null ? project.getZipcode() : "").trim();
    }
}