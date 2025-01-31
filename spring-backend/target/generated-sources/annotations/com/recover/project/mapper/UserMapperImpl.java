package com.recover.project.mapper;

import com.recover.project.dto.auth.SignupRequest;
import com.recover.project.dto.user.ShortUser;
import com.recover.project.model.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-30T20:02:29-0600",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.41.0.z20250115-2156, environment: Java 21.0.5 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toEntity(SignupRequest request) {
        if ( request == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.userType( request.usertype() );
        user.email( request.email() );
        user.password( request.password() );
        user.username( request.username() );

        return user.build();
    }

    @Override
    public ShortUser toDto(User user) {
        if ( user == null ) {
            return null;
        }

        ShortUser shortUser = new ShortUser();

        shortUser.setId( user.getId() );
        shortUser.setAvailable( user.isAvailable() );
        shortUser.setUserType( user.getUserType() );
        shortUser.setUsername( user.getUsername() );

        shortUser.setFullName( createFullName(user) );
        shortUser.setProfileImageUrl( getProfileImageUrl(role.getUser()) );

        return shortUser;
    }
}
