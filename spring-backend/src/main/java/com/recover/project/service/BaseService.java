package com.recover.project.service;

import org.springframework.transaction.annotation.Transactional;
import com.recover.project.model.BaseEntity;
import com.recover.project.dto.BaseDTO;
import com.recover.project.repository.BaseRepository;
import com.recover.project.utils.exceptions.ResourceNotFoundException;
import com.recover.project.mapper.BaseMapper;
import lombok.RequiredArgsConstructor;

// BaseService.java
@RequiredArgsConstructor
public abstract class BaseService<T extends BaseEntity, D extends BaseDTO> {
    private final BaseRepository<T> repository;
    private final BaseMapper<D, T> mapper;

    public D findById(Long id) {
        return repository.findById(id)
            .map(mapper::toDto)
            .orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
    }

    @Transactional
    public D save(D dto) {
        T entity = mapper.toEntity(dto);
        entity = repository.save(entity);
        return mapper.toDto(entity);
    }
}
