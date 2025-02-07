package com.recover.project.controller.project;

import java.util.List;
import com.recover.project.dto.project.CreateProject;
import com.recover.project.dto.project.LongProjectDto;
import com.recover.project.dto.project.ShortProjectDto;
import com.recover.project.dto.user.ShortUser;
import com.recover.project.dto.user.AssignedRoleDto;
import com.recover.project.dto.user.ProjectRoleRequest;
import com.recover.project.service.roles.RoleService;
import com.recover.project.service.authorization.UserService;
import com.recover.project.service.project.ProjectService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.Set;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final UserService userService;
    private final RoleService roleService;

    @PostMapping
    @PreAuthorize("hasRole('PROJECT_MANAGER')")
    public ResponseEntity<ShortProjectDto> createProject(
            @Valid @RequestBody CreateProject request) {
        return ResponseEntity.ok(projectService.createProject(request));
    }

    // @GetMapping
    // public ResponseEntity<Page<ShortProjectDto>> searchProjects(
    //         ProjectCriteria criteria,
    //         @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
    //     return ResponseEntity.ok(projectService.searchProjects(criteria, pageable));
    // }

    @GetMapping("/{id}")
    public ResponseEntity<LongProjectDto> getProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getLongProjectById(id));
    }

    @GetMapping("/available-technicians")
    public ResponseEntity<List<ShortUser>> getAvailableTechnicians() {
        return ResponseEntity.ok(userService.getAvailableTechnicians());
    }

    @PostMapping("/assign-technicians")
    public ResponseEntity<Set<AssignedRoleDto>> assignTechnicians(
            @RequestBody Set<ProjectRoleRequest> request) {
        return ResponseEntity.ok(
            roleService.assignRoles(request)
        );
    }
    // @PostMapping("/{projectId}/update-project-stage")
    // public ResponseEntity<Project> updateProjectStage(@PathVariable Long projectId, @RequestBody ProjectStage currentStage) {
    //     projectService.updateProjectStage(projectId, stage);
    //     return ResponseEntity.ok(projectService.getProjectById(projectId));
    // }


    @DeleteMapping("/projects/{projectId}") // Delete a project
    public void deleteProject(@PathVariable Long projectId) {
        projectService.deleteProjectById(projectId);
    }
}