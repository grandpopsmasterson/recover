package com.udacity.jwdnd.c1.review.repository;

import com.udacity.jwdnd.c1.review.model.Project;
import com.udacity.jwdnd.c1.review.model.enums.ProjectStage;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;


public interface ProjectRepository extends BaseRepository<Project> {

    @EntityGraph(attributePaths = {"assignedTechnician", "projectManager"})
    Optional<Project> findWithDetailsById(Long id);


    @Query("""
        SELECT p FROM Project p
        LEFT JOIN FETCH p.assignedTechnician t
        WHERE p.stage = :stage
        AND t.id = :technicianId
    """)
    List<Project> findByStatusAndTechnician(
        @Param("status") ProjectStage stage,
        @Param("technicianId") Long technicianId
    );

    //Search projects by keyword
    List<Project> findByProjectNameContaining(String keyword);

    void deleteById(@NonNull Long projectId);
}