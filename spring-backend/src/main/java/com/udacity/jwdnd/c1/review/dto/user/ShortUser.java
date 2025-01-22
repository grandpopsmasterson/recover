package com.udacity.jwdnd.c1.review.dto.user;
import com.udacity.jwdnd.c1.review.model.enums.UserType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShortUser {

    // for displaying available technicians, managers, adjusters, or clients
    private String username;
    private String shortName;  // "Joey B"
    private String profileImageUrl;
    private UserType userType;
    private boolean isAvailable;
}
