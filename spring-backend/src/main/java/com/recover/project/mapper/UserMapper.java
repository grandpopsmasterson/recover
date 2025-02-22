package com.recover.project.mapper;

import org.mapstruct.Mapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mappings;

import com.recover.project.dto.auth.SignupRequest;
import com.recover.project.dto.user.LongUser;
import com.recover.project.dto.user.ShortUser;
import com.recover.project.model.User;
import com.recover.project.model.enums.UserType;
import com.recover.project.utils.constants.UserTypeMap;

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
        @Mapping(target = "shortName", expression = "java(createShortName(user))"),
        @Mapping(target = "profileImageUrl", expression = "java(getProfileImageUrl(user))")
    })
    ShortUser toShortDto(User user);

    LongUser toLongDto(User user);

    default String createFullName(User user) {
        if (user == null) return "";
        return user.getFirstName() + " " + 
               (user.getLastName() != null ? user.getLastName() : "");
    }

    default String createShortName(User user) {
        if (user == null) return "";
        String firstPart = user.getFirstName();
        String lastInitial = user.getLastName() != null && !user.getLastName().isEmpty() ? 
            " " + user.getLastName().substring(0, 1) : "";
        return firstPart + lastInitial;
    }

    default UserType mapUserType(String userType) {
        return UserTypeMap.USER_MAP.get(userType);
    }

    default String getProfileImageUrl(User user) {
        if (user == null) return "/assets/default-profile.png";
        return user.getProfileImageUrl() != null ? 
            "/api/users/" + user.getId() + "/profile-image" : 
            "/assets/default-profile.png";
    }
}