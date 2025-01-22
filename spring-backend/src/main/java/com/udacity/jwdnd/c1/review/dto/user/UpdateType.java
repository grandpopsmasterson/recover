package com.udacity.jwdnd.c1.review.dto.user;

import com.udacity.jwdnd.c1.review.model.enums.UserType;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
    public class UpdateType {
        private Long userId;
        private UserType newType;
    }
