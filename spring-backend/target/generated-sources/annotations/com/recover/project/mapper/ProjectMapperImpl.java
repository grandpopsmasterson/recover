package com.recover.project.mapper;

import com.recover.project.dto.project.CreateProject;
import com.recover.project.dto.project.ProjectSummaryDto;
import com.recover.project.dto.project.ShortProjectDto;
import com.recover.project.dto.user.AssignedRoleDto;
import com.recover.project.model.Project;
import com.recover.project.model.enums.ProjectStage;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-30T20:02:29-0600",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.41.0.z20250115-2156, environment: Java 21.0.5 (Oracle Corporation)"
)
@Component
public class ProjectMapperImpl implements ProjectMapper {

    @Autowired
    private RoleMapper roleMapper;

    @Override
    public Project toEntity(CreateProject request) {
        if ( request == null ) {
            return null;
        }

        Project project = new Project();

        project.setCarrier( request.getCarrier() );
        project.setCity( request.getCity() );
        project.setClientEmail( request.getClientEmail() );
        project.setClientName( request.getClientName() );
        project.setClientPhone( request.getClientPhone() );
        project.setLossDate( request.getLossDate() );
        project.setProjectName( request.getProjectName() );
        project.setProjectType( request.getProjectType() );
        project.setStage( request.getStage() );
        project.setStartDate( request.getStartDate() );
        project.setState( request.getState() );
        project.setStreetAddress( request.getStreetAddress() );
        project.setZipcode( request.getZipcode() );

        return project;
    }

    @Override
    public ProjectSummaryDto toSummaryDto(Project project) {
        if ( project == null ) {
            return null;
        }

        ProjectSummaryDto projectSummaryDto = new ProjectSummaryDto();

        projectSummaryDto.setAssignedRoles( roleMapper.toDtoList( project.getRoles() ) );
        projectSummaryDto.setCarrier( project.getCarrier() );
        projectSummaryDto.setCity( project.getCity() );
        projectSummaryDto.setClientEmail( project.getClientEmail() );
        projectSummaryDto.setClientName( project.getClientName() );
        projectSummaryDto.setClientPhone( project.getClientPhone() );
        projectSummaryDto.setId( project.getId() );
        projectSummaryDto.setLossDate( project.getLossDate() );
        projectSummaryDto.setProjectName( project.getProjectName() );
        projectSummaryDto.setProjectType( project.getProjectType() );
        projectSummaryDto.setStage( project.getStage() );
        projectSummaryDto.setStartDate( project.getStartDate() );
        projectSummaryDto.setState( project.getState() );
        projectSummaryDto.setStreetAddress( project.getStreetAddress() );
        projectSummaryDto.setZipcode( project.getZipcode() );

        return projectSummaryDto;
    }

    @Override
    public List<ProjectSummaryDto> toSummaryDtoList(List<Project> projects) {
        if ( projects == null ) {
            return null;
        }

        List<ProjectSummaryDto> list = new ArrayList<ProjectSummaryDto>( projects.size() );
        for ( Project project : projects ) {
            list.add( toSummaryDto( project ) );
        }

        return list;
    }

    @Override
    public ShortProjectDto toShortDto(Project project) {
        if ( project == null ) {
            return null;
        }

        List<AssignedRoleDto> assignedRoles = null;
        String streetAddress = null;
        String clientName = null;
        ProjectStage stage = null;

        assignedRoles = roleMapper.toDtoList( project.getRoles() );
        streetAddress = project.getStreetAddress();
        clientName = project.getClientName();
        stage = project.getStage();

        ShortProjectDto shortProjectDto = new ShortProjectDto( streetAddress, clientName, assignedRoles, stage );

        return shortProjectDto;
    }

    @Override
    public List<ShortProjectDto> toShortDtoList(List<Project> projects) {
        if ( projects == null ) {
            return null;
        }

        List<ShortProjectDto> list = new ArrayList<ShortProjectDto>( projects.size() );
        for ( Project project : projects ) {
            list.add( toShortDto( project ) );
        }

        return list;
    }
}
