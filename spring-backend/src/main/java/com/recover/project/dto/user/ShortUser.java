package com.recover.project.dto.user;



import com.fasterxml.jackson.databind.type.ReferenceType;
import com.recover.project.model.enums.UserType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShortUser {

    private Long id;
    private String shortName;
    private String profileImageUrl;
    private UserType role;
}
