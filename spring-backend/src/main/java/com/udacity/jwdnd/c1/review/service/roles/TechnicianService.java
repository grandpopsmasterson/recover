package com.udacity.jwdnd.c1.review.service.roles;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;


import com.udacity.jwdnd.c1.review.model.Role;
import com.udacity.jwdnd.c1.review.repository.ProjectRoleRepository;
import com.udacity.jwdnd.c1.review.repository.RoleRepository;
import com.udacity.jwdnd.c1.review.repository.UserRepository;
import com.udacity.jwdnd.c1.review.dto.project.ProjectRoleDTO;
import com.udacity.jwdnd.c1.review.dto.response.role.TechnicianSummaryDTO;
import com.udacity.jwdnd.c1.review.dto.response.technician.TechnicianAssignmentRequest;
import com.udacity.jwdnd.c1.review.mapper.UserMapper;

@Service
@RequiredArgsConstructor
public class TechnicianService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;

    public List<TechnicianSummaryDTO> getAvailableTechnicians() {
        return roleRepository.findByRole(Role.TECHNICIAN)
            .stream()
            .map(userMapper::toTechnicianSummaryDto)
            .collect(Collectors.toList());
    }

    @Transactional
    public List<ProjectRoleDTO> assignTechniciansToProject(TechnicianAssignmentRequest request) {
        List<ProjectRole> newRoles = request.getTechnicianIds().stream()
            .map(techId -> createProjectRole(techId, request.getProjectId()))
            .collect(Collectors.toList());

        projectRoleRepository.saveAll(newRoles);

        return newRoles.stream()
            .map(userMapper::toProjectRoleDto)
            .collect(Collectors.toList());
    }

    private ProjectRole createProjectRole(Long technicianId, Long projectId) {
        ProjectRole role = new ProjectRole();
        role.setUser(userRepository.getReferenceById(technicianId));
        role.setProject(projectRepository.getReferenceById(projectId));
        role.setRoleType(ProjectRoleType.TECHNICIAN);
        return role;
    }
}