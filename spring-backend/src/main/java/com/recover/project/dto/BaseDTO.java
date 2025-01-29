package com.recover.project.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public abstract class BaseDTO implements Serializable {
    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String lastModifiedBy;
}