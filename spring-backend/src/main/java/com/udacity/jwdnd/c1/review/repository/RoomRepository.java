package com.udacity.jwdnd.c1.review.repository;


import com.udacity.jwdnd.c1.review.model.Room;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoomRepository extends JpaRepository<Room, Long> {
    
    @Query("SELECT r FROM Room r WHERE r.project.id = :projectId")
    List<Room> findByProjectId(@Param("projectId") Long projectId);
}
