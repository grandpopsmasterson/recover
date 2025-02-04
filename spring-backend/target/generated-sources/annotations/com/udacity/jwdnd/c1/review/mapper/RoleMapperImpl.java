package com.udacity.jwdnd.c1.review.mapper;

import com.udacity.jwdnd.c1.review.dto.user.AssignedRoleDto;
import com.udacity.jwdnd.c1.review.dto.user.ProjectRoleRequest;
import com.udacity.jwdnd.c1.review.model.Project;
import com.udacity.jwdnd.c1.review.model.Role;
import com.udacity.jwdnd.c1.review.model.User;
import com.udacity.jwdnd.c1.review.model.enums.ProjectRole;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-02-04T15:39:03-0700",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.41.0.z20250115-2156, environment: Java 21.0.5 (Eclipse Adoptium)"
)
@Component
public class RoleMapperImpl implements RoleMapper {

    @Override
    public Role toEntity(ProjectRoleRequest request) {
        if ( request == null ) {
            return null;
        }

        Role role = new Role();

        role.setProject( projectRoleRequestToProject( request ) );
        role.setUser( projectRoleRequestToUser( request ) );
        role.setProjectRole( request.getProjectRole() );

        return role;
    }

    @Override
    public AssignedRoleDto toDto(Role role) {
        if ( role == null ) {
            return null;
        }

        ProjectRole projectRole = null;
        Long id = null;
        boolean isAvailable = false;

        projectRole = role.getProjectRole();
        id = roleUserId( role );
        isAvailable = roleUserAvailable( role );

        String shortName = createShortName(role.getUser());
        String profileImageUrl = getProfileImageUrl(role.getUser());

        AssignedRoleDto assignedRoleDto = new AssignedRoleDto( id, shortName, profileImageUrl, projectRole, isAvailable );

        return assignedRoleDto;
    }

    @Override
    public List<AssignedRoleDto> toDtoList(List<Role> roles) {
        if ( roles == null ) {
            return null;
        }

        List<AssignedRoleDto> list = new ArrayList<AssignedRoleDto>( roles.size() );
        for ( Role role : roles ) {
            list.add( toDto( role ) );
        }

        return list;
    }

    protected Project projectRoleRequestToProject(ProjectRoleRequest projectRoleRequest) {
        if ( projectRoleRequest == null ) {
            return null;
        }

        Project project = new Project();

        project.setId( projectRoleRequest.getProjectId() );

        return project;
    }

    protected User projectRoleRequestToUser(ProjectRoleRequest projectRoleRequest) {
        if ( projectRoleRequest == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.id( projectRoleRequest.getUserId() );

        return user.build();
    }

    private Long roleUserId(Role role) {
        User user = role.getUser();
        if ( user == null ) {
            return null;
        }
        return user.getId();
    }

    private boolean roleUserAvailable(Role role) {
        User user = role.getUser();
        if ( user == null ) {
            return false;
        }
        return user.isAvailable();
    }
}
