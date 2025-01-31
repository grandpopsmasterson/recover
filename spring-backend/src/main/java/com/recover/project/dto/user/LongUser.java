package com.recover.project.dto.user;

import com.recover.project.model.enums.UserType;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class LongUser extends ShortUser {
    
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private UserType userType;
    private Integer currentProjectCount;
}

