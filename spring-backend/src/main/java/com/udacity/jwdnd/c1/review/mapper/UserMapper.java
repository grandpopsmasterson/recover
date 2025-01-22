package com.udacity.jwdnd.c1.review.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.udacity.jwdnd.c1.review.dto.response.role.TechnicianSummaryDTO;
import com.udacity.jwdnd.c1.review.model.User;


@Mapper(componentModel = "spring")
public interface UserMapper {
    
    @Mapping(target = "shortName", expression = "java(createShortName(user))")
    @Mapping(target = "profileImageUrl", expression = "java(getProfileImageUrl(user))")
    @Mapping(target = "isAvailable", expression = "java(checkAvailability(user))")
    TechnicianSummaryDTO toTechnicianSummaryDto(User user);

    default String createShortName(User user) {
        return user.getFirstName() + " " + 
               (user.getLastName() != null ? user.getLastName().charAt(0) + "." : "");
    }

    default String getProfileImageUrl(User user) {
        return user.getProfileImage() != null ? 
            "/api/users/" + user.getId() + "/profile-image" : 
            "/assets/default-profile.png";
    }

    default boolean checkAvailability(User user) {
        // Implement availability logic
        return true;
    }
}
