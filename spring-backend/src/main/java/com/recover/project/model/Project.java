package com.recover.project.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.recover.project.model.enums.LossType;
import com.recover.project.model.enums.ProjectStage;
import com.recover.project.model.enums.ProjectType;
import com.recover.project.model.enums.Scope;


@Entity
@Table(name = "projects")
@Data
@Builder
@ToString(exclude = {"floors", "roles"})
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_name")
    private String projectName;

    @Column(name = "client_name")
    private String clientName;

    @Column(name = "client_email")
    private String clientEmail;

    @Column(name = "client_phone")
    private String clientPhone;

    @Column(name = "claim_number")
    private String claimNumber;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "loss_date")
    private LocalDate lossDate;

    @Column(name = "received_date")
    private LocalDate receivedDate;

    @Column(name = "cat_reference")
    private String catReference;

    @Column(name = "policy_start")
    private LocalDate policyStart;

    @Column(name = "policy_expiration")
    private LocalDate policyExpiration;

    @Column(name = "year_built")
    private String yearBuilt;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "zipcode")
    private String zipcode;

    @Column(name = "carrier")
    private String carrier;

    @Column(name = "stage")
    @Enumerated(EnumType.STRING)
    private ProjectStage stage;

    @Column(name = "project_type")
    @Enumerated(EnumType.STRING)
    private ProjectType projectType;

    @Column(name = "loss_type")
    @Enumerated(EnumType.STRING)
    private LossType lossType;

    @Column(name = "scope")
    @Enumerated(EnumType.STRING)
    private Scope scope;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Floor> floors = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Role> roles = new ArrayList<>();


}
