package com.recover.project.mapper;

import org.mapstruct.Mapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mappings;

import com.recover.project.dto.auth.SignupRequest;
import com.recover.project.dto.user.ShortUser;
import com.recover.project.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mappings({
        @Mapping(target = "id", ignore = true),  // Let Database generate the ID
        @Mapping(source = "usertype", target = "userType")
    })
    User toEntity(SignupRequest request);   // going into the database -->

   @Mappings({     
       @Mapping(source = "id", target = "id"),
       @Mapping(target = "fullName", expression = "java(createFullName(user))"),
       @Mapping(target = "profileImageUrl", expression = "java(getProfileImageUrl(role.getUser()))"),
       @Mapping(source = "available", target = "available")
   })
   ShortUser toDto(User user); 



   default String createFullName(User user) {
       if (user == null) return "";
       return user.getFirstName() + " " + 
              (user.getLastName() != null ? user.getLastName() : "");
   }
   default String getProfileImageUrl(User user) {
    if (user == null) return "/assets/default-profile.png";
    return user.getProfileImageUrl() != null ? 
        "/api/users/" + user.getId() + "/profile-image" : 
        "/assets/default-profile.png";
}

} // getting from the database, packaging as a dto -->