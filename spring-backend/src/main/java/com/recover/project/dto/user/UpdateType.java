package com.recover.project.dto.user;



import com.recover.project.model.enums.UserType;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
    public class UpdateType {
        private Long userId;
        private UserType newType;
    }
