package com.recover.project.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.recover.project.dto.project.CreateProject;
import com.recover.project.dto.project.LongProjectDto;
import com.recover.project.dto.project.ShortProjectDto;
import com.recover.project.model.Project;


@Mapper(componentModel = "spring", uses = {RoleMapper.class, FloorplanMapper.class})
public interface ProjectMapper {

    @Mappings({
        @Mapping(target = "id", ignore = true), // Let Database generate the ID
        @Mapping(target = "roles", source = "assignedUsers", ignore = true),
    })
    Project toEntity(CreateProject request); // going into the database -->


    @Mapping(source = "roles", target = "assignedRoles")  // assignedRoles creates role DTOs in the RoleMapper.class and passes them back
    LongProjectDto toLongDto(Project project);

    List<LongProjectDto> toLongDtoList(List<Project> projects);

    @Mapping(source = "roles", target = "assignedRoles")  // assigned roles is a dto that was packaged and passed in from RoleMapper
    ShortProjectDto toShortDto(Project project);

    List<ShortProjectDto> toShortDtoList(List<Project> projects);

    default String getFullAddress(Project project) {
        return String.format("%s%s%s %s",
            project.getStreetAddress() != null ? project.getStreetAddress() + ", " : "",
            project.getCity() != null ? project.getCity() + ", " : "",
            project.getState() != null ? project.getState() : "",
            project.getZipcode() != null ? project.getZipcode() : "").trim();
    }

}