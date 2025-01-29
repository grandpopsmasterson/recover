package com.recover.project.service.search;

import java.time.LocalDate;
import java.util.List;

import com.recover.project.model.enums.ProjectStage;
import com.recover.project.model.enums.ProjectType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProjectCriteria {
   private String searchTerm;
   
   // Optional filters if needed
   private LocalDate startDate;
   private LocalDate endDate;
   private List<ProjectStage> stages;
   private List<ProjectType> types;
}
