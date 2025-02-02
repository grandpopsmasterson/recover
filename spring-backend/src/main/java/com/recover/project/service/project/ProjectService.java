package com.recover.project.service.project;

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
import com.recover.project.model.enums.ProjectStage;
import com.recover.project.repository.ProjectRepository;
import com.recover.project.repository.RoleRepository;
//import com.recover.project.service.notifications.NotificationService;
import com.recover.project.service.roles.RoleService;
import com.recover.project.service.search.ProjectCriteria;
import com.recover.project.service.search.ProjectSpecification;
import com.recover.project.utils.exceptions.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final RoleRepository roleRepository;
    private final RoleService roleService;

    //private final NotificationService notificationService;
    private final ApplicationEventPublisher eventPublisher;
    private final ProjectMapper projectMapper;



    @Transactional
    public ShortProjectDto createProject(CreateProject request) {
        Project project = projectMapper.toEntity(request); // first map project to entity, ignoring roles
        project.setStage(ProjectStage.INITIAL);
        Project savedProject = projectRepository.save(project);
 
        if (request.getAssignedUsers() != null) { // once you have project saved, get the id
            roleService.assignRoles(request.getAssignedUsers().stream()
                .collect(Collectors.toSet()));
        }

        return projectMapper.toShortDto(savedProject);
    }
    // still to do:
    
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
