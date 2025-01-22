package com.udacity.jwdnd.c1.review.service;

import org.springframework.transaction.annotation.Transactional;
import com.udacity.jwdnd.c1.review.model.BaseEntity;
import com.udacity.jwdnd.c1.review.dto.BaseDTO;
import com.udacity.jwdnd.c1.review.repository.BaseRepository;
import com.udacity.jwdnd.c1.review.mapper.BaseMapper;
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
