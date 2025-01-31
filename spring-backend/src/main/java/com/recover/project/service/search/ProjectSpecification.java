package com.recover.project.service.search;

import org.springframework.data.jpa.domain.Specification;

import com.recover.project.model.Project;


public class ProjectSpecification {
    public static Specification<Project> createSpecification(ProjectCriteria criteria) {
        return (root, query, cb) -> {
            if (criteria.getSearchTerm() == null) {
                return null;
            }
 
            String searchTerm = "%" + criteria.getSearchTerm().toLowerCase() + "%";
            
            return cb.or(
                cb.like(cb.lower(root.get("projectName")), searchTerm),
                cb.like(cb.lower(root.get("clientName")), searchTerm),
                cb.like(cb.lower(root.get("clientEmail")), searchTerm),
                cb.like(cb.lower(root.get("streetAddress")), searchTerm),
                cb.like(cb.lower(root.get("city")), searchTerm),
                cb.equal(root.get("stage").as(String.class), criteria.getSearchTerm()),
                cb.equal(root.get("id").as(String.class), criteria.getSearchTerm())
            );
        };
    }
 }