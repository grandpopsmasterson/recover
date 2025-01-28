package com.udacity.jwdnd.c1.review.repository;

import com.udacity.jwdnd.c1.review.model.Project;
import com.udacity.jwdnd.c1.review.model.enums.ProjectRole;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;


public interface ProjectRepository extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project> {

    // idk, maybe something regarding searchbar
    @EntityGraph(attributePaths = {"assignedTechnician", "projectManager"})
    Optional<Project> findWithDetailsById(Long id);

    // (useful) Returns projects for a specific user of a specific access type
    @Query(""" 
    SELECT p 
    FROM Project p 
    JOIN p.roles r 
    WHERE r.userId = :userId 
    AND r.projectRole = :projectRole
    """)
    List<Project> findProjectsByUserIdAndRole(@Param("userId") Long userId, @Param("projectRole") ProjectRole projectRole);

    //Search projects by keyword
    List<Project> findByProjectNameContaining(String keyword);

    void deleteById(@NonNull Long projectId);
}