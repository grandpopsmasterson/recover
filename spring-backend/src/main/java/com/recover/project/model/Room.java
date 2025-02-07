package com.recover.project.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

import com.recover.project.model.enums.ClassRating;

@Entity
@Table(name = "rooms")
@Data
@Builder
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_name")
    private String roomName;

    @Column(name = "room_area")
    private double roomArea;

    @Column(name = "dmg_area")
    private double damagedArea;

    @Column(name = "room_length")
    private double length;

    @Column(name = "room_width")
    private double width;

    @Column(name = "dmg_length")
    private double dmgLength;

    @Column(name = "dmg_width")
    private double dmgWidth;

    @Column(name = "dmg_percent")
    private double dmgPercent;

    @Column(name = "damaged")
    private boolean isDamaged;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Loss> lossType = new ArrayList<>(); // "Fire", "Mold", "Water"

    @Enumerated(EnumType.STRING)
    @Column(name = "class_rating")
    private ClassRating classRating;

    @ManyToOne
    @JoinColumn(name = "floor_id")
    private Floor floor; // The project this room belongs to

}
