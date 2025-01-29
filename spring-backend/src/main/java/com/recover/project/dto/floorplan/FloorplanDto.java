package com.recover.project.dto.floorplan;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FloorplanDto {

    private List<FloorDto> floors;

    public FloorplanDto(List<FloorDto> floors) {
        this.floors = floors;
    }

}
