package com.udacity.jwdnd.c1.review.mapper;

import com.udacity.jwdnd.c1.review.dto.project.ProjectSummaryDto;
import com.udacity.jwdnd.c1.review.model.Project;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-27T23:28:31-0600",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.41.0.z20250115-2156, environment: Java 21.0.5 (Eclipse Adoptium)"
)
@Component
public class ProjectMapperImpl implements ProjectMapper {

    @Autowired
    private RoleMapper roleMapper;

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
}
