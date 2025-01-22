package com.udacity.jwdnd.c1.review.service.roles;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.udacity.jwdnd.c1.review.model.Project;
import com.udacity.jwdnd.c1.review.model.Role;
import com.udacity.jwdnd.c1.review.model.User;
import com.udacity.jwdnd.c1.review.repository.RoleRepository;

import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class ProjectRoleService {
    private final RoleRepository roleRepository;
    private final UserService userService;

    @Transactional
    public void assignMembers(Project project, Set<ProjectRoleRequest> memberRequests) {
        Set<Role> roles = memberRequests.stream()
            .map(request -> createProjectRole(project, request))
            .collect(Collectors.toSet());
            
        roleRepository.saveAll(roles);
    }

    private Role createProjectRole(Project project, ProjectRoleRequest request) {
        User user = userService.getReference(request.getUserId());
        return Role.builder()
            .project(project)
            .user(user)
            .roleType(request.getRoleType())
            .build();
    }
}