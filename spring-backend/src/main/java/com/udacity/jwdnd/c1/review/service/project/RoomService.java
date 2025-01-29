package com.udacity.jwdnd.c1.review.service.project;

import com.udacity.jwdnd.c1.review.dto.floorplan.FloorDto;
import com.udacity.jwdnd.c1.review.dto.floorplan.FloorplanDto;
import com.udacity.jwdnd.c1.review.dto.floorplan.RoomDto;
import com.udacity.jwdnd.c1.review.mapper.FloorplanMapper;
import com.udacity.jwdnd.c1.review.model.Project;
import com.udacity.jwdnd.c1.review.model.Room;
import com.udacity.jwdnd.c1.review.repository.ProjectRepository;
import com.udacity.jwdnd.c1.review.repository.RoomRepository;
import com.udacity.jwdnd.c1.review.utils.exceptions.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomService {

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