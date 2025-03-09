package com.recover.project.dto.project;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectListDto {

    private List<ProjectDto> projects;
    private Integer count;
    //private List<Flag> flags;
}