package com.recover.project.service.project;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.recover.project.dto.floorplan.FloorDto;
import com.recover.project.dto.floorplan.FloorplanDto;
import com.recover.project.dto.floorplan.RoomDto;
import com.recover.project.mapper.FloorplanMapper;
import com.recover.project.model.Project;
import com.recover.project.model.Room;
import com.recover.project.repository.ProjectRepository;
import com.recover.project.repository.RoomRepository;
import com.recover.project.utils.exceptions.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FloorsRoomsService {

    private final RoomRepository roomRepository;
    private final ProjectRepository projectRepository;
    private final FloorplanMapper floorplanMapper;

    private Room addRoomToProject(RoomDto room) {
        return floorplanMapper.toRoomEntity(room);
    }

    // if you want to get the whole floorplan DTO
    public FloorplanDto getFloorplanByProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        
            return floorplanMapper.toFloorplanDto(project.getFloors());
    }

    // if you want to get a list of floors with rooms
    public List<FloorDto> getFloorDtosByProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        
        return project.getFloors().stream()
            .map(floorplanMapper::toFloorDto)
            .sorted(Comparator.comparing(FloorDto::getFloorLevel))
            .collect(Collectors.toList());
        }
}



// public void createRoomsFromGeneratedCode(String codeSnippets, Long projectId) throws Exception {
    //     ObjectMapper mapper = new ObjectMapper();
    //     List<Room> rooms = mapper.readValue(codeSnippets, new TypeReference<>() {});

    //     for (Room room : rooms) {
    //         addRoomToProject(projectId, room);
    //     }
    // } ------> for matterport parsing in the future