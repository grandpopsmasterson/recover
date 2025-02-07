package com.recover.project.mapper;

import org.mapstruct.Mapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mappings;

import com.recover.project.dto.auth.SignupRequest;
import com.recover.project.dto.user.LongUser;
import com.recover.project.dto.user.ShortUser;
import com.recover.project.model.User;
import com.recover.project.model.enums.UserType;
import com.recover.project.utils.constants.StringMapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mappings({
        @Mapping(target = "id", ignore = true),
        @Mapping(target = "userType",
                expression = "java(mapUserType(request.userType()))")
    })
    User toEntity(SignupRequest request);

    @Mappings({     
        @Mapping(source = "id", target = "id"),
        @Mapping(target = "fullName", expression = "java(createFullName(user))"),
        @Mapping(target = "profileImageUrl", expression = "java(getProfileImageUrl(user))"), // Changed this line
        @Mapping(source = "available", target = "available")
    })
    ShortUser toShortDto(User user);

    LongUser toLongDto(User user);

    default String createFullName(User user) {
        if (user == null) return "";
        return user.getFirstName() + " " + 
               (user.getLastName() != null ? user.getLastName() : "");
    }
    default UserType mapUserType(String userType) {
        return StringMapper.USER_MAP.get(userType);
    }

    default String getProfileImageUrl(User user) {
        if (user == null) return "/assets/default-profile.png";
        return user.getProfileImageUrl() != null ? 
            "/api/users/" + user.getId() + "/profile-image" : 
            "/assets/default-profile.png";
    }
}