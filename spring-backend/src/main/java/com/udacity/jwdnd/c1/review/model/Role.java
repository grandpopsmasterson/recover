package com.udacity.jwdnd.c1.review.model;

import com.udacity.jwdnd.c1.review.model.enums.ProjectRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "roles")
@Getter @Setter 
@NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Long userId;
    
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Long projectId;

    @Column(name = "project_role")
    private ProjectRole projectRole;

}