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
import com.udacity.jwdnd.c1.review.dto.project.ProjectResponse;
import com.udacity.jwdnd.c1.review.event.ProjectAssignedEvent;
import com.udacity.jwdnd.c1.review.event.ProjectStageUpdatedEvent;
import com.udacity.jwdnd.c1.review.mapper.ProjectMapper;
import com.udacity.jwdnd.c1.review.model.Project;
import com.udacity.jwdnd.c1.review.model.Role;
import com.udacity.jwdnd.c1.review.model.User;
import com.udacity.jwdnd.c1.review.model.enums.NotificationType;
import com.udacity.jwdnd.c1.review.model.enums.ProjectStage;
import com.udacity.jwdnd.c1.review.repository.ProjectRepository;
import com.udacity.jwdnd.c1.review.repository.RoleRepository;
import com.udacity.jwdnd.c1.review.service.notifications.NotificationService;

import io.jsonwebtoken.lang.Arrays;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final RoleRepository roleRepository;
    private final NotificationService notificationService;
    private final ApplicationEventPublisher eventPublisher;
    private final ProjectMapper projectMapper;

    @Transactional
    public ProjectResponse createProject(CreateProject request) {
        Project project = new Project();
        project.setProjectName(request.getName());
        project.setStage(ProjectStage.INITIAL);
        project.setProjectManager(userService.getProjectManagerEntity(request.getProjectManagerId()));
        
        project = projectRepository.save(project);
        return projectMapper.toResponse(project);
    }

    public Page<ProjectResponse> findProjects(ProjectCriteria criteria, Pageable pageable) {
        Specification<Project> spec = ProjectSpecification.createSpecification(criteria);
        return projectRepository.findAll(spec, pageable)
            .map(projectMapper::toDto);
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProjectStage(Long projectId, Integer stage) {
        Project project = projectRepository.getReferenceById(projectId);
        project.setStage(stage);
        return projectRepository.save(project);

        eventPublisher.publishEvent(new ProjectStageUpdatedEvent(projectId));
    }

    public void AssignProject(Project project, User technician) {
        Role role = new Role();
        role.setProject(project);
        role.setUser(technician);
        role.setRoleName("TECHNICIAN");
        roleRepository.save(role);
        eventPublisher.publishEvent(new ProjectAssignedEvent(project.getId(), technician.getUsername()));
    }


    public Project getProjectById(Long projectId) {
        return projectRepository.findProjectById(projectId);
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
