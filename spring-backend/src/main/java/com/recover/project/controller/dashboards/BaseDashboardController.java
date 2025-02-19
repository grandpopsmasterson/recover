package com.recover.project.controller.dashboards;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.recover.project.utils.constants.Constants;
import com.recover.project.dto.project.ProjectBucketDto;
import com.recover.project.dto.project.ProjectListDto;
import com.recover.project.dto.project.ShortProjectDto;
import com.recover.project.model.Project;
import com.recover.project.model.enums.ProjectRole;
import com.recover.project.service.authorization.AuthenticationService;
import com.recover.project.service.authorization.UserService;
import com.recover.project.service.project.ProjectService;
import com.recover.project.utils.exceptions.ResourceNotFoundException;
import com.recover.project.utils.exceptions.UnauthorizedException;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class BaseDashboardController {
    private final ProjectService projectService;
    private final UserService userService;
    private final AuthenticationService authenticationService;

   @GetMapping("/get-all")
    public ResponseEntity<?> getAllProjects() {
        try {
            ProjectListDto projects = projectService.getAllProjects();
            if (projects.getProjects().isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Projects not found or not authorized");
            }
            return ResponseEntity.ok(projects);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred while processing the request");
        }
    }

    @GetMapping("/grouped")
    public ResponseEntity<?> getGroupedProjects(@RequestParam String groupBy) {
        try {
            List<ProjectBucketDto> projects = projectService.getGroupedProjects(groupBy);
            if (projects.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Projects not found or not authorized");
            }
            return ResponseEntity.ok(projects);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Invalid grouping criteria: " + groupBy);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred while processing the request");
        }
    }

    @GetMapping("/multi-query-filter")
    public ResponseEntity<?> searchProjects(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String groupBy,
            @RequestParam MultiValueMap<String, String> allParams) {
        try {
            // Remove query and groupBy from filters
            Map<String, List<String>> filters = new HashMap<>(allParams);
            filters.remove("query");
            filters.remove("groupBy");
            
            ProjectListDto projects = projectService.searchProjects(query, groupBy, filters);
            if (projects.getProjects().isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No projects found matching the search criteria");
            }
            return ResponseEntity.ok(projects);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Invalid search criteria: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred while processing the request");
        }
    }
}