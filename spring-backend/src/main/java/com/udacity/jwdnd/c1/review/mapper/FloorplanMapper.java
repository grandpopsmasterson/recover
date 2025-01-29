package com.udacity.jwdnd.c1.review.mapper;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.udacity.jwdnd.c1.review.dto.floorplan.FloorDto;
import com.udacity.jwdnd.c1.review.dto.floorplan.FloorplanDto;
import com.udacity.jwdnd.c1.review.dto.floorplan.RoomDto;
import com.udacity.jwdnd.c1.review.model.Floor;
import com.udacity.jwdnd.c1.review.model.Room;

@Mapper(componentModel = "spring")
public interface FloorplanMapper {
  
    RoomDto toRoomDto(Room room);

    Room toRoomEntity(RoomDto roomDto);

    @Mapping(target = "floorLevel", source = "floorLevel")
    @Mapping(target = "floorName", source = "floorName")
    @Mapping(target = "rooms", source = "rooms")
    FloorDto toFloorDto(Floor floor);

    default FloorplanDto toFloorplanDto(List<Floor> floors) {
        if (floors == null || floors.isEmpty()) {
            return new FloorplanDto(new ArrayList<>());
        }

        List<FloorDto> floorDtos = floors.stream()
            .map(this::toFloorDto)
            .sorted(Comparator.comparing(FloorDto::getFloorLevel))
            .collect(Collectors.toList());

        return new FloorplanDto(floorDtos);
    }
}