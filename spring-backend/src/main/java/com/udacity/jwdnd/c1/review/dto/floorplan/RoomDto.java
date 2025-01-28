package com.udacity.jwdnd.c1.review.dto.floorplan;

import com.udacity.jwdnd.c1.review.model.enums.ClassRating;
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
