package com.recover.project.mapper;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.recover.project.dto.floorplan.FloorDto;
import com.recover.project.dto.floorplan.FloorplanDto;
import com.recover.project.dto.floorplan.RoomDto;
import com.recover.project.model.Floor;
import com.recover.project.model.Room;


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