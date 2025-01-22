package com.udacity.jwdnd.c1.review.dto.project;

import java.time.LocalDate;
import java.util.List;

import com.udacity.jwdnd.c1.review.model.Role;
import com.udacity.jwdnd.c1.review.model.enums.ProjectStage;

import lombok.Getter;
import lombok.Setter;




public class ProjectDto {


    @Getter @Setter
    public static class Summary {
        private Long id;
        private String name;
        private String homeowner;
        private ProjectStage stage;
        private LocalDate startDate;
        private LocalDate lossDate;
        private int roomCount;
        private List<ProjectUserAssignment> assignedUsers;
    }

    @Getter @Setter
    public static class Detail extends Summary {
        private String description;
        private List<ProjectUserAssignment> assignedUsers;
        private List<RoomDto.Summary> rooms;
    }
}