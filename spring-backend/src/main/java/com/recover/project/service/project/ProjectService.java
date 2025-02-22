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
import com.recover.project.dto.user.ShortUser;
import com.recover.project.mapper.ProjectMapper;
import com.recover.project.mapper.UserMapper;
import com.recover.project.model.Project;
import com.recover.project.model.Role;
import com.recover.project.model.enums.ProjectRole;
import com.recover.project.repository.ProjectRepository;
import com.recover.project.repository.RoleRepository;
import com.recover.project.repository.UserRepository;
import com.recover.project.search.ProjectSpecification;
import com.recover.project.service.authorization.AuthenticationService;
//import com.recover.project.service.notifications.NotificationService;
import com.recover.project.utils.exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.AbstractMap;
import java.util.Collections;
import java.util.List;
import java.util.Map;
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
    private final UserRepository userRepository;
    private final UserMapper userMapper;


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
    
    public List<ProjectBucketDto> getGroupedProjects(String groupBy) {
        List<Project> projects = projectRepository.findAll();
        Function<Project, ?> groupingFunction = ProjectSpecification.getGroupingFunction(groupBy);

        return projects.stream()
            .collect(Collectors.groupingBy(groupingFunction))
            .entrySet().stream()
            .map(projectMapper::toProjectBucketDto)
            .collect(Collectors.toList());
    }

    public ProjectListDto searchProjects(
            String textQuery, 
            String groupBy, 
            Map<String, List<String>> filters) {      
        try {
            // Get filtered projects
            Specification<Project> spec = ProjectSpecification.createSpecification(textQuery, filters);
            List<Project> projects = spec == null ? 
                projectRepository.findAll() : 
                projectRepository.findAll(spec);
            
            return projectMapper.toProjectListDto(
                new AbstractMap.SimpleEntry<>(
                    StringUtils.hasText(groupBy) ? groupBy : "all", 
                    projects
                )
            );
        } catch (IllegalArgumentException e) {
            logger.error("Invalid grouping criteria: {}", groupBy, e);
            return projectMapper.toProjectListDto(
                new AbstractMap.SimpleEntry<>("all", Collections.emptyList())
            );
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

    public List<ShortUser> getAllUsers() {
        return userRepository.findAll()
            .stream()
            .map(userMapper::toShortDto)
            .collect(Collectors.toList());
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
