package com.udacity.jwdnd.c1.review.dto.project;

import com.udacity.jwdnd.c1.review.model.enums.ProjectStage;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
    public class UpdateProject {
        private String name;
        private String description;
        private ProjectStage stage;
    }
// this is now my branch version