package com.udacity.jwdnd.c1.review.service.roles;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import com.udacity.jwdnd.c1.review.dto.user.AssignedRoleDto;
import com.udacity.jwdnd.c1.review.dto.user.ProjectRoleRequest;
import com.udacity.jwdnd.c1.review.event.ProjectAssignedEvent;
import com.udacity.jwdnd.c1.review.mapper.RoleMapper;
import com.udacity.jwdnd.c1.review.model.Role;
import com.udacity.jwdnd.c1.review.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectRoleService {
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;
    private final ApplicationEventPublisher eventPublisher;

    public Set<AssignedRoleDto> assignRoles(Set<ProjectRoleRequest> requests) {
        return requests.stream()
            .map(this::assignSingleRole)
            .collect(Collectors.toSet());
    }
 
    // do not call this one by itself, call the one above
    private AssignedRoleDto assignSingleRole(ProjectRoleRequest request) {
        Role role = roleRepository.findRoleByAllOptions(request.getUserId(), request.getProjectId(), request.getProjectRole())
            .map(existingRole -> {
                Role updatedRole = roleMapper.toEntity(request);
                return roleRepository.save(updatedRole);
            })
            .orElseGet(() -> roleRepository.save(roleMapper.toEntity(request)));
            
        return roleMapper.toDto(role);
        eventPublisher.publishEvent(new ProjectAssignedEvent(role, request.getProjectId(), request.getUserId())); // have to fix with better event listener
    }

}