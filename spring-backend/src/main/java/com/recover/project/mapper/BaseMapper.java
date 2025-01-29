package com.recover.project.mapper;

import java.util.List;

// Generic interface for basic mapping operations
public interface BaseMapper<D, E> {
    E toEntity(D dto);
    D toDto(E entity);
    List<E> toEntity(List<D> dtoList);
    List<D> toDto(List<E> entityList);
}
