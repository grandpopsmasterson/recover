package com.recover.project.search;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Root;

import com.recover.project.model.Project;
import com.recover.project.model.enums.LossType;
import com.recover.project.model.enums.ProjectRole;
import com.recover.project.model.enums.ProjectStage;
import com.recover.project.model.enums.ProjectType;
import com.recover.project.model.enums.Scope;

@Component
public class ProjectSpecification {
    
    public static Specification<Project> createSpecification(String textQuery, Map<String, List<String>> filters) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            // Add text search if present
            if (StringUtils.hasText(textQuery)) {
                predicates.add(createTextSearchPredicate(root, cb, textQuery));
            }
            
            // Add filters if present
            filters.forEach((field, values) -> {
                if (!values.isEmpty()) {
                    List<Predicate> fieldPredicates = values.stream()
                        .map(value -> createFieldPredicate(root, cb, field, value))
                        .filter(Objects::nonNull)
                        .collect(Collectors.toList());
                    if (!fieldPredicates.isEmpty()) {
                        predicates.add(cb.or(fieldPredicates.toArray(new Predicate[0])));
                    }
                }
            });
            
            return predicates.isEmpty() ? null : cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private static Predicate createTextSearchPredicate(Root<Project> root, CriteriaBuilder cb, String query) {
        String searchTerm = "%" + query.toLowerCase() + "%";
        return cb.or(
            cb.like(cb.lower(root.get("projectName")), searchTerm),
            cb.like(cb.lower(root.get("catReference")), searchTerm),
            cb.like(cb.lower(root.get("streetAddress")), searchTerm),
            cb.like(cb.lower(root.get("city")), searchTerm),
            cb.like(cb.lower(root.get("state")), searchTerm),
            cb.like(cb.lower(root.get("zipcode")), searchTerm),
            cb.like(cb.lower(root.get("clientName")), searchTerm),
            cb.like(cb.lower(root.get("clientEmail")), searchTerm),
            cb.like(cb.lower(root.get("claimNumber")), searchTerm)
        );
    }

    private static Predicate createFieldPredicate(Root<Project> root, CriteriaBuilder cb, 
                                                String field, String value) {
        try {
            switch (field.toUpperCase()) {
                case "STAGE":
                    return cb.equal(root.get("stage"), ProjectStage.valueOf(value.toUpperCase()));
                case "SCOPE":
                    return cb.equal(root.get("scope"), Scope.valueOf(value.toUpperCase()));
                case "LOSS_TYPE":
                    return cb.equal(root.get("lossType"), LossType.valueOf(value.toUpperCase()));
                case "PROJECT_TYPE":
                    return cb.equal(root.get("projectType"), ProjectType.valueOf(value.toUpperCase()));
                default:
                    return null;
            }
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    public static Function<Project, ?> getGroupingFunction(String groupBy) {
        return switch (groupBy.toUpperCase()) {
            case "STAGE" -> Project::getStage;
            case "SCOPE" -> Project::getScope;
            case "CARRIER" -> Project::getCarrier;
            case "LOSS_TYPE" -> Project::getLossType;
            case "PROJECT_TYPE" -> Project::getProjectType;
            case "MANAGER" -> project -> project.getRoles().stream()
                .filter(role -> role.getProjectRole() == ProjectRole.MANAGER)
                .map(role -> role.getUser().getFullName())
                .collect(Collectors.joining(", "));
            case "TECHNICIAN" -> project -> project.getRoles().stream()
                .filter(role -> role.getProjectRole() == ProjectRole.TECHNICIAN)
                .map(role -> role.getUser().getFullName())
                .collect(Collectors.joining(", "));
            case "ADJUSTER" -> project -> project.getRoles().stream()
                .filter(role -> role.getProjectRole() == ProjectRole.ADJUSTER)
                .map(role -> role.getUser().getFullName())
                .collect(Collectors.joining(", "));
            default -> throw new IllegalArgumentException("Invalid grouping criteria: " + groupBy);
        };
    }
}