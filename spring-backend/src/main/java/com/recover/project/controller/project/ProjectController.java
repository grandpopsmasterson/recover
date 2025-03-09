package com.recover.project.controller.project;

import java.util.List;
import java.util.Map;

import com.docusign.esign.client.ApiException;
// import com.recover.project.config.DocuSignConfig;
import com.recover.project.dto.project.CreateProject;
import com.recover.project.dto.project.ProjectDto;
import com.recover.project.dto.project.ProjectDto;
import com.recover.project.dto.user.ShortUser;
import com.recover.project.model.Project;
import com.recover.project.dto.user.AssignedRoleDto;
import com.recover.project.dto.user.ProjectRoleRequest;
import com.recover.project.service.roles.RoleService;
// import com.recover.project.service.uploads.DocuSignService;
import com.recover.project.service.authorization.UserService;
import com.recover.project.service.project.ProjectService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final UserService userService;
    private final RoleService roleService;
    // private final DocuSignService docuSignService;
    // private final DocuSignConfig docuSignConfig;
    private final Logger logger = LoggerFactory.getLogger(ProjectController.class);

    @PostMapping("/create-project")
    //@PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<ProjectDto> createProject(
            @Valid @RequestBody CreateProject request) {
        return ResponseEntity.ok(projectService.createProject(request));
    }
    
    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectDto> getProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(projectService.getProjectById(projectId));
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

    // @PostMapping("/{projectId}/work-authorization")
    // public ResponseEntity<?> initiateWorkAuthorization(
    //     @PathVariable Long projectId
    // ) {
    //     try {
    //         // Retrieve the project from the database
    //         Project project = projectService.findById(projectId);
                

    //         // Send envelope and get envelope ID
    //         String envelopeId = docuSignService.sendEnvelopeFromTemplate(project, docuSignConfig.docuSignApiClient());
            
    //         // Get signing URL
    //         String signingUrl = docuSignService.getSigningUrl(envelopeId, docuSignConfig.docuSignApiClient(), project);

    //         // Prepare response
    //         Map<String, String> response = Map.of(
    //             "projectId", project.getId().toString(),
    //             "envelopeId", envelopeId,
    //             "signingUrl", signingUrl
    //         );

    //         return ResponseEntity.ok(response);
    //     } catch (ApiException e) {
    //         // Log the full error for server-side tracking
    //         logger.error("DocuSign API Error", e);

    //         // Return a user-friendly error response
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //             .body(Map.of(
    //                 "error", "Failed to create work authorization",
    //                 "details", e.getMessage()
    //             ));
    //     } catch (Exception e) {
    //         // Catch any unexpected errors
    //         logger.error("Unexpected error in work authorization", e);

    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //             .body(Map.of(
    //                 "error", "An unexpected error occurred",
    //                 "details", e.getMessage()
    //             ));
    //     }
    // }
    @DeleteMapping("/{projectId}") // Delete a project
    public void deleteProject(@PathVariable Long projectId) {
        projectService.deleteProjectById(projectId);
    }
}