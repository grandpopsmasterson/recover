package com.udacity.jwdnd.c1.review.repository;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.udacity.jwdnd.c1.review.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
    // Get all roles for specific user and role
    @Query("SELECT r FROM Role r WHERE r.user.id = :userId AND r.roleName = :roleName")
    List<Role> findUserByIdandRole(@Param("userId") Long userId, @Param("roleName") String roleName);

    // Get a project for a user with permissions
    @Query("SELECT r FROM Role r WHERE r.user.id = :userId AND r.project.id = :projectId")
    List<Role> findByUser_UserIdAndProjectId(@Param("userId") Long userId, @Param("projectId") Long projectId);


    @Query("SELECT r FROM Role r WHERE r.user.id = :userId AND r.roleName IN :roleNames")
    List<Role> findRolesByUserIdAndRoleNames(@Param("userId") Long userId, @Param("roleNames") List<String> roleNames);
}
