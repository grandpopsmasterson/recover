package com.recover.project.model;

import com.recover.project.model.enums.LossType;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "project_losses")
@Getter @Setter
@NoArgsConstructor
public class Loss {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loss_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "loss_type")
    private LossType lossType;
}