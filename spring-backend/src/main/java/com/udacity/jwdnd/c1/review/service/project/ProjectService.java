package com.udacity.jwdnd.c1.review.service.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.security.config.authentication.UserServiceBeanDefinitionParser;
import org.springframework.security.core.context.SecurityContextHolder;

import com.udacity.jwdnd.c1.review.dto.project.CreateProject;
import com.udacity.jwdnd.c1.review.dto.project.LongProjectSummary;
import com.udacity.jwdnd.c1.review.dto.project.ShortProjectDto;
import com.udacity.jwdnd.c1.review.dto.user.ProjectRoleRequest;
import com.udacity.jwdnd.c1.review.dto.user.AssignedRoleDto;
import com.udacity.jwdnd.c1.review.event.ProjectAssignedEvent;
import com.udacity.jwdnd.c1.review.event.ProjectStageUpdatedEvent;
import com.udacity.jwdnd.c1.review.mapper.ProjectMapper;
import com.udacity.jwdnd.c1.review.model.Project;
import com.udacity.jwdnd.c1.review.model.Role;
import com.udacity.jwdnd.c1.review.model.User;
import com.udacity.jwdnd.c1.review.model.enums.NotificationType;
import com.udacity.jwdnd.c1.review.model.enums.ProjectRole;
import com.udacity.jwdnd.c1.review.model.enums.ProjectStage;
import com.udacity.jwdnd.c1.review.repository.ProjectRepository;
import com.udacity.jwdnd.c1.review.repository.RoleRepository;
import com.udacity.jwdnd.c1.review.service.notifications.NotificationService;
import com.udacity.jwdnd.c1.review.service.roles.ProjectRoleService;
import com.udacity.jwdnd.c1.review.service.search.ProjectCriteria;
import com.udacity.jwdnd.c1.review.service.search.ProjectSpecification;
import com.udacity.jwdnd.c1.review.utils.exceptions.ResourceNotFoundException;

import io.jsonwebtoken.lang.Arrays;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final RoleRepository roleRepository;

    private final NotificationService notificationService;
    private final ProjectRoleService roleService;
    private final ApplicationEventPublisher eventPublisher;
    private final ProjectMapper projectMapper;

    @Transactional
    public LongProjectSummary createProject(CreateProject request) {
        Project project = projectMapper.toEntity(request);
        project.setStage(ProjectStage.INITIAL);
        Project savedProject = projectRepository.save(project);
 
        if (request.getAssignedUsers() != null) {
            roleService.assignRoles(request.getAssignedUsers().stream()
                .collect(Collectors.toSet()));
        }

        return projectMapper.toLongDto(savedProject);
    }

    // to create:
    
    // update any field on the project

    // event listeners 

    // more inspection additions to the project (adding forms, receipts, photos)


   public Page<ShortProjectDto> searchProjects(String query, Pageable pageable) {
       ProjectCriteria criteria = ProjectCriteria.builder()
           .searchTerm(query)
           .build();
           
       Specification<Project> spec = ProjectSpecification.createSpecification(criteria);
       return projectRepository.findAll(spec, pageable)
           .map(projectMapper::toShortDto);
   }

    public List<ShortProjectDto> getProjectsListByRole(Long userId, ProjectRole projectRole) {
        return projectRepository.findProjectsByUserIdAndRole(userId, projectRole)
            .stream()
            .map(projectMapper::toShortDto)
            .collect(Collectors.toList());
    }

    public ShortProjectDto getProjectById(Long projectId) {
        return projectRepository.findById(projectId)
            .map(projectMapper::toShortDto)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));
    }

    public ShortProjectDto getProjectByIdwithRoles(Long projectId) {
        List<Role> owners = roleRepository.findRolesByProjectIdAndRoleType(projectId, ProjectRole.MANAGER);
        List<Role> technicians = roleRepository.findRolesByProjectIdAndRoleType(projectId, ProjectRole.TECHNICIAN);
        return projectMapper
            .map(project -> {
                return projectMapper.toShortDto(project, project.getRoles());
            }).orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));
    }

    public void deleteProjectById(Long projectId) {
        projectRepository.deleteById(projectId);
    }

    public String getAuthenticatedUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public Role saveRole(Role role){
        return roleRepository.save(role);
    }

}
