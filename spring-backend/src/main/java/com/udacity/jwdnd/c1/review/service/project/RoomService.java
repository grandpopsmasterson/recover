package com.udacity.jwdnd.c1.review.service.project;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.udacity.jwdnd.c1.review.model.Project;
import com.udacity.jwdnd.c1.review.model.Room;
import com.udacity.jwdnd.c1.review.repository.ProjectRepository;
import com.udacity.jwdnd.c1.review.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final ProjectRepository projectRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository, ProjectRepository projectRepository) {
        this.roomRepository = roomRepository;
        this.projectRepository = projectRepository;
    }

    public void createRoomsFromGeneratedCode(String codeSnippets, Long projectId) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        List<Room> rooms = mapper.readValue(codeSnippets, new TypeReference<>() {});

        for (Room room : rooms) {
            addRoomToProject(projectId, room);
        }
    }

    public void addRoomToProject(Long floorId, Room room) {
        Project project = projectRepository.findProjectById(projectId);
        if (project == null) {
            throw new RuntimeException("Project not found with ID: " + projectId);
        }
        try {
            room.setProject(project);
            roomRepository.save(room);
        } catch (Exception e) {
            throw new RuntimeException("Error adding room to project: " + e.getMessage(), e);
        }
    }

    public List<Room> getRoomsByProjectId(Long projectId) {
        Project project = projectRepository.findProjectById(projectId);
        if (project == null) {
            throw new RuntimeException("Project not found with ID: " + projectId);
        }
        return roomRepository.findByProjectId(projectId); // Get all rooms associated with this project
    }
}