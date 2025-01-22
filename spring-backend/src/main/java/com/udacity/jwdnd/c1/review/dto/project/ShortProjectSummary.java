package com.udacity.jwdnd.c1.review.dto.project;

import java.util.List;

import com.udacity.jwdnd.c1.review.dto.user.ShortUser;
import com.udacity.jwdnd.c1.review.model.enums.ProjectStage;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
    public class ShortProjectSummary{
        private String address;
        private List<ShortUser> assignedUsers;
        private ProjectStage stage;
    }
