package com.udacity.jwdnd.c1.review.controller.project;

import com.udacity.jwdnd.c1.review.model.Room;
import com.udacity.jwdnd.c1.review.service.project.RoomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.List;


@RestController
public class RoomController {

    private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/{projectId}/rooms") // Show rooms in a project
    public ResponseEntity<List<Room>> getProjectRooms(@PathVariable Long projectId) {
        List<Room> rooms = roomService.getRoomsByProjectId(projectId);
        if (rooms.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
        return ResponseEntity.ok(rooms);
    }

    
    @GetMapping("/create-room") // Shows the create room form
    public String showCreateRoomForm(Model model) {
        model.addAttribute("room", new Room());
        return "createRoomForm"; // (createRoomForm.html)
    }

}