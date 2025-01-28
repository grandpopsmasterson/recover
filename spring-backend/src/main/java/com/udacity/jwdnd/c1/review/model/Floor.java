package com.udacity.jwdnd.c1.review.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Floor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Integer floorLevel;

    private String floorName;

    private String matterportFloorplanUrl;
    
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    
    @OneToMany(mappedBy = "floor", cascade = CascadeType.ALL)
    private List<Room> rooms = new ArrayList<>();
}
