package com.udacity.jwdnd.c1.review.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.udacity.jwdnd.c1.review.model.enums.ProjectStage;


@Entity
@Table(name = "projects")
@Getter @Setter
@NoArgsConstructor
public class Project extends BaseEntity {

    @Column(name = "project_name")
    private String projectName;

    @Column(name = "client_name")
    private String clientName;

    @Column(name = "client_email")
    private String clientEmail;

    @Column(name = "client_phone")
    private String clientPhone;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "zipcode")
    private String zipcode;

    @Column(name = "loss_date")
    private LocalDate lossDate;

    @Enumerated(EnumType.STRING)
    private ProjectStage stage;

    @Column(name = "carrier")
    private String carrier;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<String> floors = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Role> roles = new ArrayList<>();
}
