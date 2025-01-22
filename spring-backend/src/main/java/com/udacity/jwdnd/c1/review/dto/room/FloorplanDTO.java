package com.udacity.jwdnd.c1.review.dto.room;

import java.util.List;

import com.udacity.jwdnd.c1.review.model.Room;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class FloorplanDTO {
    private List<Integer> floors;
    private List<Room> rooms;

}
