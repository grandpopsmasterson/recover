package com.recover.project.dto.project;

import com.recover.project.model.Flag;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectBucketDto {
    private String groupKey;  // More generic than just 'stage'
    private List<ShortProjectDto> projects;
    private long count;
    //private List<Flag> flags;
}