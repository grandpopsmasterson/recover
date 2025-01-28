package com.udacity.jwdnd.c1.review.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.udacity.jwdnd.c1.review.dto.user.AssignedRoleDto;
import com.udacity.jwdnd.c1.review.dto.user.ProjectRoleRequest;
import com.udacity.jwdnd.c1.review.model.Role;
import com.udacity.jwdnd.c1.review.model.User;

@Mapper(componentModel = "spring")
public interface RoleMapper {



    @Mappings({
        @Mapping(target = "id", ignore = true),  // Let Database generate the ID
        @Mapping(source = "projectId", target = "project.id"),
        @Mapping(source = "userId", target = "user.id"),
        @Mapping(source = "projectRole", target = "projectRole")
    })
    Role toEntity(ProjectRoleRequest request);   // going into the database -->

   @Mappings({
       @Mapping(source = "projectRole", target = "projectRole"),
       @Mapping(source = "user.id", target = "id"),
       @Mapping(target = "shortName", expression = "java(createShortName(role.getUser()))"),
       @Mapping(target = "profileImageUrl", expression = "java(getProfileImageUrl(role.getUser()))"),
       @Mapping(source = "user.available", target = "isAvailable")
   })
   AssignedRoleDto toDto(Role role);  // getting from the database, packaging as a dto -->


   // package as a list
   List<AssignedRoleDto> toDtoList(List<Role> roles);

   
   
   // utility functions 
   
   default String createShortName(User user) {
       if (user == null) return "";
       return user.getFirstName() + " " + 
              (user.getLastName() != null ? user.getLastName().charAt(0) + "." : "");
   }

   default String getProfileImageUrl(User user) {
       if (user == null) return "/assets/default-profile.png";
       return user.getProfileImageUrl() != null ? 
           "/api/users/" + user.getId() + "/profile-image" : 
           "/assets/default-profile.png";
   }
}