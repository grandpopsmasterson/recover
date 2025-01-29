package com.recover.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.recover.project.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
    
    @Query("SELECT r FROM Room r WHERE r.floor.id = :floorId")
    List<Room> findByFloorLevel(@Param("floorId") Long floorId);
}
