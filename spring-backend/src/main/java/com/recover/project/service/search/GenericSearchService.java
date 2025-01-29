package com.recover.project.service.search;
/*
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.recover.project.model.Project;
import com.recover.project.model.User;
import com.recover.project.model.enums.ReferenceType;

import jakarta.annotation.*;
import jakarta.persistence.*;
import lombok.*;


@Service
@RequiredArgsConstructor
public class GenericSearchService {
    private final EntityManager entityManager;
    private final Map<ReferenceType, Class<?>> entityMap = new HashMap<>();

    @PostConstruct
    public void initEntityMap() {
        entityMap.put(ReferenceType.USER, User.class);
        entityMap.put(ReferenceType.PROJECT, Project.class);
        // Add other mappings
    }

    public <T, D> Page<D> searchByReferenceType(
            ReferenceType referenceType, 
            String searchTerm, 
            Class<D> dtoClass,
            Pageable pageable) {
        
        Class<?> entityClass = entityMap.get(referenceType);
        if (entityClass == null) {
            throw new IllegalArgumentException("Unsupported reference type: " + referenceType);
        }

        String query = createSearchQuery(entityClass, referenceType);
        String countQuery = createCountQuery(entityClass, referenceType);
        Map<String, Object> params = Map.of("searchTerm", "%" + searchTerm + "%");

        TypedQuery<?> typedQuery = entityManager.createQuery(query, entityClass);
        TypedQuery<Long> countTypedQuery = entityManager.createQuery(countQuery, Long.class);
        
        params.forEach((key, value) -> {
            typedQuery.setParameter(key, value);
            countTypedQuery.setParameter(key, value);
        });

        typedQuery.setFirstResult((int) pageable.getOffset());
        typedQuery.setMaxResults(pageable.getPageSize());

        List<?> entities = typedQuery.getResultList();
        Long total = countTypedQuery.getSingleResult();

        // Convert entities to DTOs
        List<D> dtos = entities.stream()
            .map(entity -> modelMapper.map(entity, dtoClass))
            .collect(Collectors.toList());

        return new PageImpl<>(dtos, pageable, total);
    }

    private String createSearchQuery(Class<?> entityClass, ReferenceType type) {
        return switch (type) {
            case USER -> "SELECT u FROM User u WHERE LOWER(u.username) LIKE LOWER(:searchTerm)";
            case FLOORPLAN -> "SELECT f FROM Floorplan f WHERE f.name LIKE :searchTerm";
            default -> throw new IllegalArgumentException("Unsupported type: " + type);
        };
    }

    private String createCountQuery(Class<?> entityClass, ReferenceType type) {
        return switch (type) {
            case USER -> "SELECT COUNT(u) FROM User u WHERE LOWER(u.username) LIKE LOWER(:searchTerm)";
            case FLOORPLAN -> "SELECT COUNT(f) FROM Floorplan f WHERE f.name LIKE :searchTerm";
            default -> throw new IllegalArgumentException("Unsupported type: " + type);
        };
    }
}
    */
