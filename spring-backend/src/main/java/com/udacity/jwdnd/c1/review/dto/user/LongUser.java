package com.udacity.jwdnd.c1.review.dto.user;

import com.udacity.jwdnd.c1.review.model.enums.UserType;

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

