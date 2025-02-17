package com.recover.project.controller.dashboards;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.recover.project.utils.constants.Constants;
import com.recover.project.dto.project.ProjectBucketDto;
import com.recover.project.dto.project.ShortProjectDto;
import com.recover.project.model.enums.ProjectRole;
import com.recover.project.search.ProjectSearchCriteria;
import com.recover.project.search.SearchOperation;
import com.recover.project.service.authorization.AuthenticationService;
import com.recover.project.service.authorization.UserService;
import com.recover.project.service.project.ProjectService;
import com.recover.project.utils.exceptions.UnauthorizedException;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
public class BaseDashboardController {
    private final ProjectService projectService;
    private final UserService userService;
    private final AuthenticationService authenticationService;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getAllProjects() {
        try {
            Long userId = authenticationService.getCurrentUserId();
            //ProjectRole currentUserRole = Constants.ROLE_MAP.get(userService.findById(userId).getUserType());

            Set<ShortProjectDto> projects = projectService.getAllProjects(userId);
            if (projects.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Projects not found or not authorized");
            }
            return ResponseEntity.ok(projects);
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request");
        }
    }

    @GetMapping("/grouped")
    public ResponseEntity<List<ProjectBucketDto>> getGroupedProjects(
        @RequestParam String groupBy,
        @RequestParam(required = false) String query
    ) {
        ProjectSearchCriteria criteria = ProjectSearchCriteria.builder()
            .groupBy(groupBy)
            .query(query)
            .build();
            
        return ResponseEntity.ok(projectService.getGroupedProjects(criteria));
    }

    // @GetMapping("/Dashboard")
    // public ResponseEntity<?> getProjectById() {
    //     try {
    //         Long userId = authenticationService.getCurrentUserId();
    //         ProjectRole currentUserRole = Constants.ROLE_MAP.get(userService.findById(userId).getUserType());

    //         List<ShortProjectDto> projects = projectService.getProjectsListByRole(userId, currentUserRole);
    //         if (projects.isEmpty()) {
    //             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Projects not found or not authorized");
    //         }
    //         return ResponseEntity.ok(projects);
    //     } catch (UnauthorizedException e) {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request");
    //     }
    // }
}