package com.recover.project.dto.project;

import java.time.LocalDate;
import java.util.Set;

import com.google.auto.value.AutoValue.Builder;
import com.recover.project.dto.user.ProjectRoleRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Builder
public class CreateProject {
   @NotBlank(message = "Project name is required")
   private String projectName;
   
   @NotNull(message = "Start date is required")
   private LocalDate startDate;

   @NotNull(message = "Loss date is required") 
   private LocalDate lossDate;

   @NotNull
   private LocalDate receivedDate;

   private LocalDate policyStart;

   private LocalDate policyExpiration;

   private String claimNumber;

   private String yearBuilt;

   private String catReference;

   private String carrier;

   @NotNull(message = "Client name is required") 
   private String clientName;

   @NotNull(message = "Client email is required") 
   private String clientEmail; 

   @NotNull(message = "Client phone is required") 
   private String clientPhone;

   private String streetAddress;

   private String city;

   private String state;

   private String zipcode;

   private String stage;

   private String projectType;

   private String lossType;

   private String scope;

   private Set<ProjectRoleRequest> assignedUsers;
   
}