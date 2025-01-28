package com.udacity.jwdnd.c1.review.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.udacity.jwdnd.c1.review.model.Role;
import com.udacity.jwdnd.c1.review.model.enums.ProjectRole;

public interface RoleRepository extends JpaRepository<Role, Long> {

  // For finding a user's specific permission on a project
  @Query("SELECT r FROM Role r WHERE r.user.id = :userId AND r.project.id = :projectId")
  List<Role> findByUserIdAndProjectId(@Param("userId") Long userId, @Param("projectId") Long projectId);


  // (completely useless) Returns a single role from all parameters
  @Query("SELECT r FROM Role r WHERE r.user.id = :userId AND r.project.id = :projectId AND r.projectRole = :projectRole")
  Optional<Role> findRoleByAllOptions(@Param("userId") Long userId, @Param("projectId") Long projectId, @Param("projectRole") ProjectRole projectRole);


  // (kinda useful) For finding specific project for a user with specific role // follow with project.findById(role.getProject())
  @Query("SELECT r FROM Role r WHERE r.user.id = :userId AND r.projectRole IN :project_role")
  List<Role> findRolesByUserIdAndRoleType(@Param("userId") Long userId, @Param("projectRole") ProjectRole projectRole);


  // (useful) For finding all (technicians, owners) on a specific project // follow with user.findById(role.getUser())
  @Query("SELECT r FROM Role r WHERE r.project.id = :projectId AND r.projectRole IN :project_role")
  List<Role> findRolesByProjectIdAndRoleType(@Param("projectId") Long projectId, @Param("projectRole") ProjectRole projectRole);


  
}
