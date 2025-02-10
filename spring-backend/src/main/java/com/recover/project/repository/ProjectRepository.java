package com.recover.project.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;

import com.recover.project.model.Project;
import com.recover.project.model.enums.ProjectRole;

import java.util.List;
import java.util.Optional;
import java.util.Set;


public interface ProjectRepository extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project> {

    // idk, maybe something regarding searchbar
    @EntityGraph(attributePaths = {"assignedTechnician", "projectManager"})
    Optional<Project> findWithDetailsById(Long id);

    // (useful) Returns projects for a specific user of a specific access type
    @Query(""" 
    SELECT p 
    FROM Project p 
    JOIN p.roles r 
    WHERE r.user.id = :userId 
    AND r.projectRole = :projectRole
    """)
    List<Project> findProjectsByUserIdAndRole(@Param("userId") Long userId, @Param("projectRole") ProjectRole projectRole);

    @Query("""
    SELECT DISTINCT p
    FROM Project p
    JOIN FETCH p.roles r
    JOIN FETCH r.user u
    WHERE u.id = :userId
    """)
    Set<Project> findAllProjectsByUserId(Long userId);

    //Search projects by keyword
    List<Project> findByProjectNameContaining(String keyword);

    void deleteById(@NonNull Long projectId);
}