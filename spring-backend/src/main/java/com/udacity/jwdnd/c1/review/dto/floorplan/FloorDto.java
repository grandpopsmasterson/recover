package com.udacity.jwdnd.c1.review.dto.floorplan;

import java.util.List;
import lombok.Data;

@Data
public class FloorDto {
    private String floorName;
    private Integer floorLevel;
    private List<RoomDto> rooms;
}