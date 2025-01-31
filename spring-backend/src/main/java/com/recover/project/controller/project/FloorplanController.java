package com.recover.project.controller.project;

import com.recover.project.dto.floorplan.FloorDto;
import com.recover.project.dto.floorplan.FloorplanDto;
import com.recover.project.model.Room;
import com.recover.project.service.project.FloorsRoomsService;

import lombok.RequiredArgsConstructor;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("projects/{projectId}/floors")
@RequiredArgsConstructor
public class FloorplanController {

     private final FloorsRoomsService floorsRoomsService;
    private static final Logger logger = LoggerFactory.getLogger(FloorplanController.class);

    @GetMapping
    public List<FloorDto> getProjectFloors(@PathVariable Long projectId) {
        logger.info("Fetching floors for project: {}", projectId);
        return floorsRoomsService.getFloorDtosByProject(projectId);
    }

    @GetMapping("/floorplan")
    public FloorplanDto getProjectFloorplan(@PathVariable Long projectId) {
        logger.info("Fetching floorplan for project: {}", projectId);
        return floorsRoomsService.getFloorplanByProject(projectId);
    }

    
    @GetMapping("/create-room") // Shows the create room form
    public String showCreateRoomForm(Model model) {
        model.addAttribute("room", new Room());
        return "createRoomForm"; // (createRoomForm.html)
    }

}