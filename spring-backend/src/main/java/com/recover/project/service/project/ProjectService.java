package com.recover.project.service.project;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import com.recover.project.dto.project.CreateProject;
import com.recover.project.dto.project.LongProjectDto;
import com.recover.project.dto.project.ShortProjectDto;
import com.recover.project.mapper.ProjectMapper;
import com.recover.project.model.Project;
import com.recover.project.model.Role;
import com.recover.project.model.enums.ProjectRole;
import com.recover.project.repository.ProjectRepository;
import com.recover.project.repository.RoleRepository;
import com.recover.project.service.authorization.AuthenticationService;
//import com.recover.project.service.notifications.NotificationService;
import com.recover.project.service.search.ProjectCriteria;
import com.recover.project.service.search.ProjectSpecification;
import com.recover.project.utils.exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final RoleRepository roleRepository;
    private final AuthenticationService authService;
    //private final NotificationService notificationService;
    private final ApplicationEventPublisher eventPublisher;
    private final ProjectMapper projectMapper;
    private final Logger logger = LoggerFactory.getLogger(ProjectService.class);


    @Transactional
    public ShortProjectDto createProject(CreateProject request) {
        Project project = projectRepository.save(projectMapper.toEntity(request));
        if (request.getAssignedUsers() == null || request.getAssignedUsers().isEmpty()) {
            Role defaultRole = Role.builder()
                .project(project)
                .user(authService.getCurrentUser())  // Get the creating user
                .projectRole(ProjectRole.MANAGER)    // Or whatever default role
                .build();
            roleRepository.save(defaultRole);
        }
        
        return projectMapper.toShortDto(project);
    }
    // still to do:
    
    // update any field on the project

    // event listeners 

    // more inspection additions to the project (adding forms, receipts, photos)

    public Set<ShortProjectDto> getAllProjects(Long userId) {
        try {
            logger.info("Fetching projects for userId: {}", userId);
            
            Set<ShortProjectDto> projects = projectRepository.findAllProjectsByUserId(userId)
                .stream()
                .map(projectMapper::toShortDto)
                .collect(Collectors.toSet());
            
            logger.info("Number of projects found: {}", projects.size());
            
            return projects;
        } catch (Exception e) {
            logger.error("Error fetching projects for userId: {}", userId, e);
            
            // Either rethrow or return an empty set based on your error handling strategy
            return Collections.emptySet();
        }
    }

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

    public ShortProjectDto getShortProjectById(Long projectId) {
        return projectRepository.findById(projectId)
            .map(projectMapper::toShortDto)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));
    }

    public LongProjectDto getLongProjectById(Long projectId) {
        return projectRepository.findById(projectId)
            .map(projectMapper::toLongDto)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));
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
