package com.udacity.jwdnd.c1.review.controller.dashboards;

import com.udacity.jwdnd.c1.review.model.Project;
import com.udacity.jwdnd.c1.review.service.authorization.UserDetailsImpl;
import com.udacity.jwdnd.c1.review.service.project.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class BaseDashboardController {

    private final ProjectService projectService;

    @Autowired
    public BaseDashboardController(ProjectService projectService) {
        this.projectService = projectService;
    }
    
    @GetMapping("/dashboard") // get all user's projects
    public ResponseEntity<?> getProjectById() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            try {
                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                Long userId = userDetails.getId();
                List<Project> projects = projectService.getAllProjectsForUser(userId);
                if (projects.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Projects not found or not authorized");
                }
                return ResponseEntity.ok(projects);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
    }

}