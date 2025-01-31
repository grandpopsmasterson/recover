package com.recover.project.mapper;

import com.recover.project.dto.floorplan.FloorDto;
import com.recover.project.dto.floorplan.RoomDto;
import com.recover.project.model.Floor;
import com.recover.project.model.Room;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-30T20:02:29-0600",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.41.0.z20250115-2156, environment: Java 21.0.5 (Oracle Corporation)"
)
@Component
public class FloorplanMapperImpl implements FloorplanMapper {

    @Override
    public RoomDto toRoomDto(Room room) {
        if ( room == null ) {
            return null;
        }

        RoomDto roomDto = new RoomDto();

        roomDto.setClassRating( room.getClassRating() );
        roomDto.setDamaged( room.isDamaged() );
        roomDto.setRoomArea( room.getRoomArea() );
        roomDto.setRoomName( room.getRoomName() );

        return roomDto;
    }

    @Override
    public Room toRoomEntity(RoomDto roomDto) {
        if ( roomDto == null ) {
            return null;
        }

        Room room = new Room();

        room.setClassRating( roomDto.getClassRating() );
        room.setDamaged( roomDto.isDamaged() );
        room.setRoomArea( roomDto.getRoomArea() );
        room.setRoomName( roomDto.getRoomName() );

        return room;
    }

    @Override
    public FloorDto toFloorDto(Floor floor) {
        if ( floor == null ) {
            return null;
        }

        FloorDto floorDto = new FloorDto();

        floorDto.setFloorLevel( floor.getFloorLevel() );
        floorDto.setFloorName( floor.getFloorName() );
        floorDto.setRooms( roomListToRoomDtoList( floor.getRooms() ) );

        return floorDto;
    }

    protected List<RoomDto> roomListToRoomDtoList(List<Room> list) {
        if ( list == null ) {
            return null;
        }

        List<RoomDto> list1 = new ArrayList<RoomDto>( list.size() );
        for ( Room room : list ) {
            list1.add( toRoomDto( room ) );
        }

        return list1;
    }
}
