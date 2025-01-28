package com.udacity.jwdnd.c1.review.dto.user;
import com.udacity.jwdnd.c1.review.model.enums.ReferenceType;
import com.udacity.jwdnd.c1.review.model.enums.UserType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShortUser {

    private ReferenceType referenceType; // "Entity: user" //
    private String username;
    private String shortName;  // "Joey B"
    private String profileImageUrl;
    private UserType userType;
    private boolean isAvailable;
}
