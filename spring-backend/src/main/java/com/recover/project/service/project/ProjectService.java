package com.recover.project.service.project;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import com.recover.project.dto.project.CreateProject;
import com.recover.project.dto.project.LongProjectDto;
import com.recover.project.dto.project.ProjectBucketDto;
import com.recover.project.dto.project.ProjectListDto;
import com.recover.project.dto.project.ShortProjectDto;
import com.recover.project.mapper.ProjectMapper;
import com.recover.project.model.Project;
import com.recover.project.model.Role;
import com.recover.project.model.enums.ProjectRole;
import com.recover.project.repository.ProjectRepository;
import com.recover.project.repository.RoleRepository;
import com.recover.project.search.GenericSpecification;
import com.recover.project.search.ProjectSearchCriteria;
import com.recover.project.service.authorization.AuthenticationService;
//import com.recover.project.service.notifications.NotificationService;
import com.recover.project.service.search.ProjectCriteria;
import com.recover.project.service.search.ProjectSpecification;
import com.recover.project.utils.exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.AbstractMap;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.function.Function;
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
    
    public List<ProjectBucketDto> getGroupedProjects(ProjectSearchCriteria criteria) {
        Specification<Project> spec = GenericSpecification.createSpecification(criteria);
        List<Project> projects = StringUtils.hasText(criteria.getQuery())
            ? projectRepository.findAll(spec)
            : projectRepository.findAll();

        Function<Project, ?> groupingFunction = GenericSpecification.getGroupingFunction(criteria.getGroupBy());

        return projects.stream()
            .collect(Collectors.groupingBy(groupingFunction))
            .entrySet().stream()
            .map(projectMapper::toProjectBucketDto)
            .collect(Collectors.toList());
    }

    public Set<ShortProjectDto> getAllProjectsById(Long userId) {
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

    public ProjectListDto getAllProjects() {
        try {
            logger.info("Fetching projects");   
            List<Project> projects = projectRepository.findAll();
            ProjectListDto projectList = projectMapper.toProjectListDto(
                new AbstractMap.SimpleEntry<>("all", projects)
            );
            logger.info("Number of projects found: {}", projectList.getCount());   
            return projectList;
        } catch (Exception e) {
            logger.error("Error fetching projects", e);     
            return projectMapper.toProjectListDto(
                new AbstractMap.SimpleEntry<>("all", Collections.emptyList())
            );
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
