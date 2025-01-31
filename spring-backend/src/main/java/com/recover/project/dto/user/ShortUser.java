package com.recover.project.dto.user;



import com.fasterxml.jackson.databind.type.ReferenceType;
import com.recover.project.model.enums.UserType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShortUser {

    private Long id;
    private ReferenceType referenceType; // "Entity: user" //
    private String username;
    private String FullName;
    private String profileImageUrl;
    private UserType userType;
    private boolean isAvailable;
}
