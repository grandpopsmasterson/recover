package com.recover.project.dto.project;

import java.time.LocalDate;
import java.util.List;

import com.google.auto.value.AutoValue.Builder;
import com.recover.project.dto.user.ProjectRoleRequest;
import com.recover.project.model.enums.ProjectStage;
import com.recover.project.model.enums.ProjectType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
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

   private ProjectStage stage;

   private ProjectType projectType;

   private String carrier;

   @NotEmpty(message = "At least one owner is required")
   private List<ProjectRoleRequest> assignedUsers;
   
}