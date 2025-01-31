package com.recover.project.dto.floorplan;


import com.recover.project.model.enums.ClassRating;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomDto {
    private String roomName;
    private boolean isDamaged;
    private double roomArea;
    private ClassRating classRating;
}
