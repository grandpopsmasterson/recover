package com.udacity.jwdnd.c1.review.controller.project;

import com.udacity.jwdnd.c1.review.dto.project.CreateProject;
import com.udacity.jwdnd.c1.review.dto.project.LongProjectSummary;
import com.udacity.jwdnd.c1.review.dto.project.ShortProjectDto;
import com.udacity.jwdnd.c1.review.dto.user.ShortUser;
import com.udacity.jwdnd.c1.review.dto.user.ProjectRoleRequest;
import com.udacity.jwdnd.c1.review.model.*;
import com.udacity.jwdnd.c1.review.service.roles.ProjectRoleService;
import com.udacity.jwdnd.c1.review.service.search.ProjectCriteria;
import com.udacity.jwdnd.c1.review.service.authorization.UserDetailsImpl;
import com.udacity.jwdnd.c1.review.service.project.ProjectService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.hibernate.query.SortDirection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final ProjectRoleService projectRoleService;

    @PostMapping
    @PreAuthorize("hasRole('PROJECT_MANAGER')")
    public ResponseEntity<LongProjectSummary> createProject(
            @Valid @RequestBody CreateProject request) {
        return ResponseEntity.ok(projectService.createProject(request));
    }

    @GetMapping
    public ResponseEntity<Page<ShortProjectDto>> searchProjects(
            ProjectCriteria criteria,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(projectService.searchProjects(criteria, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LongProjectSummary> getProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.findById(id));
    }

    @GetMapping("/available-technicians")
    public ResponseEntity<List<ShortUser>> getAvailableTechnicians() {
        return ResponseEntity.ok(technicianService.getAvailableTechnicians());
    }

    @PostMapping("/assign-technicians")
    public ResponseEntity<List<ProjectRoleDTO>> assignTechnicians(
            @RequestBody TechnicianAssignmentRequest request) {
        return ResponseEntity.ok(
            technicianService.assignTechniciansToProject(request)
        );
    }
    @PostMapping("/update-project-stage/{projectId}") // update project stage
    public ResponseEntity<Project> updateProjectStage(@PathVariable Long projectId, @RequestBody Integer stage) {
        projectService.updateProjectStage(projectId, stage);
        return ResponseEntity.ok(projectService.getProjectById(projectId));
    }


    @DeleteMapping("/projects/{projectId}") // Delete a project
    public void deleteProject(@PathVariable Long projectId) {
        projectService.deleteProjectById(projectId);
    }
}