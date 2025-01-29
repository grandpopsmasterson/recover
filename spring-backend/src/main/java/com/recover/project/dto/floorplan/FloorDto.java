package com.recover.project.dto.floorplan;

import java.util.List;
import lombok.Data;

@Data
public class FloorDto {
    private String floorName;
    private Integer floorLevel;
    private List<RoomDto> rooms;
}