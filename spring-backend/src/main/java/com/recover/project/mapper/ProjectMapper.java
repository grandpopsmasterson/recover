package com.recover.project.mapper;

import java.util.List;
import java.util.Set;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.recover.project.dto.project.CreateProject;
import com.recover.project.dto.project.LongProjectDto;
import com.recover.project.dto.project.ShortProjectDto;
import com.recover.project.model.Project;
import com.recover.project.model.enums.LossType;
import com.recover.project.model.enums.ProjectStage;
import com.recover.project.model.enums.ProjectType;
import com.recover.project.model.enums.Scope;
import com.recover.project.utils.constants.ProjTypeMap;
import com.recover.project.utils.constants.LossTypeMap;
import com.recover.project.utils.constants.ScopeMap;
import com.recover.project.utils.constants.StageMap;

@Mapper(componentModel = "spring", uses = {RoleMapper.class, FloorplanMapper.class})
public interface ProjectMapper {

    @Mappings({
        @Mapping(target = "id", ignore = true), // Let Database generate the ID
        @Mapping(target = "roles", source = "assignedUsers", ignore = true),
        @Mapping(target = "projectType",
                expression = "java(mapProjectType(request.getProjectType()))"),
        @Mapping(target = "lossType",
                expression = "java(mapLossType(request.getLossType()))"),
        @Mapping(target = "scope",
                expression = "java(mapScope(request.getScope()))"),
        @Mapping(target = "stage",
                expression = "java(mapProjectStage(request.getStage()))")        
    })
    Project toEntity(CreateProject request); // going into the database -->


    @Mapping(source = "roles", target = "assignedRoles")  // assignedRoles creates role DTOs in the RoleMapper.class and passes them back
    LongProjectDto toLongDto(Project project);

    List<LongProjectDto> toLongDtoList(List<Project> projects);

    @Mapping(source = "roles", target = "assignedRoles")  // assigned roles is a dto that was packaged and passed in from RoleMapper
    ShortProjectDto toShortDto(Project project);

    Set<ShortProjectDto> toShortDtoList(Set<Project> projects);

    default ProjectStage mapProjectStage(Integer projectStage) {
        return StageMap.STAGE_MAP.get(projectStage);
    }

    default ProjectType mapProjectType(String projectType) {
        return ProjTypeMap.ProjType_MAP.get(projectType);
    }

    default LossType mapLossType(String lossType) {
        return LossTypeMap.LOSS_MAP.get(lossType);
    }
    
    default Scope mapScope(String scope) {
        return ScopeMap.SCOPE_MAP.get(scope);
    }


    default String getFullAddress(Project project) {
        return String.format("%s%s%s %s",
            project.getStreetAddress() != null ? project.getStreetAddress() + ", " : "",
            project.getCity() != null ? project.getCity() + ", " : "",
            project.getState() != null ? project.getState() : "",
            project.getZipcode() != null ? project.getZipcode() : "").trim();
    }

}