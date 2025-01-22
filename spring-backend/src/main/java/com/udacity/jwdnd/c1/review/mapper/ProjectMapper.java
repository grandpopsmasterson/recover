package com.udacity.jwdnd.c1.review.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.udacity.jwdnd.c1.review.dto.project.ProjectResponse;
import com.udacity.jwdnd.c1.review.model.Project;

@Mapper(componentModel = "spring", uses = {UserMapper.class, RoomMapper.class})
public interface ProjectMapper extends BaseMapper<ProjectResponse, Project> {

    @Override
    @Mapping(target = "stage", expression = "java(entity.getStage().name())")
    @Mapping(target = "assignedTechnicians", qualifiedByName = "toSummary")
    @Mapping(target = "address", expression = "java(entity.getstreetAddress() + ', ' + entity.getCity() + ', ' + entity.getState() + ' ' + entity.getZipcode())")
    ProjectResponse toDto(Project entity);



    // Special mapping for creating new projects
    @Named("forCreate")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "rooms", ignore = true)
    Project toEntityForCreate(ProjectResponse createDTO);
}
