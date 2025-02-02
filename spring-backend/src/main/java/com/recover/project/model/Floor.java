package com.recover.project.model;

import java.util.ArrayList;
import java.util.List;

import com.google.auto.value.AutoValue.Builder;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "floors")
@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Floor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Integer floorLevel;

    private String floorName;

    private String matterport_Url;
    
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    
    @OneToMany(mappedBy = "floor", cascade = CascadeType.ALL)
    private List<Room> rooms = new ArrayList<>();
}
