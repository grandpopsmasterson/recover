package com.recover.project.service.roles;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import com.recover.project.dto.user.AssignedRoleDto;
import com.recover.project.dto.user.ProjectRoleRequest;
import com.recover.project.event.ProjectAssignedEvent;
import com.recover.project.mapper.RoleMapper;
import com.recover.project.model.Role;
import com.recover.project.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;
    private final ApplicationEventPublisher eventPublisher;

    public Set<AssignedRoleDto> assignRoles(Set<ProjectRoleRequest> requests) {
        return requests.stream()
            .map(this::assignSingleRole)
            .collect(Collectors.toSet());
    }
 
    // do not call this one by itself, call the one above
    private AssignedRoleDto assignSingleRole(ProjectRoleRequest request) {  //first check if the role exists
        Role role = roleRepository.findRoleByAllOptions(request.getUserId(), request.getProjectId(), request.getProjectRole())
            .map(existingRole -> {
                Role updatedRole = roleMapper.toEntity(request); // if role exists, use toEntity and update it in DB
                return roleRepository.save(updatedRole);
            })
            .orElseGet(() -> roleRepository.save(roleMapper.toEntity(request))); // if doesn't exist, save new role from request
            
        return roleMapper.toDto(role);
        //eventPublisher.publishEvent(new ProjectAssignedEvent(role, request.getProjectId(), request.getUserId()));
    }


}