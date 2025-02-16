package com.recover.project.search;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.recover.project.model.Project;
import com.recover.project.model.enums.LossType;
import com.recover.project.model.enums.ProjectStage;
import com.recover.project.model.enums.ProjectType;

@Component
public class GenericSpecification {
    public static Specification<Project> createSpecification(ProjectSearchCriteria criteria) {
        return (root, query, cb) -> {
            if (!StringUtils.hasText(criteria.getQuery())) {
                return null;
            }

            // Try to parse enums first
            try {
                // Try to parse as ProjectStage
                ProjectStage stage = ProjectStage.valueOf(criteria.getQuery().toUpperCase());
                return cb.equal(root.get("stage"), stage);
            } catch (IllegalArgumentException ignored) {}

            try {
                // Try to parse as LossType
                LossType lossType = LossType.valueOf(criteria.getQuery().toUpperCase());
                return cb.equal(root.get("lossType"), lossType);
            } catch (IllegalArgumentException ignored) {}

            try {
                // Try to parse as ProjectType
                ProjectType projectType = ProjectType.valueOf(criteria.getQuery().toUpperCase());
                return cb.equal(root.get("projectType"), projectType);
            } catch (IllegalArgumentException ignored) {}

            // If not an enum, do text search across multiple fields
            return cb.or(
                cb.like(cb.lower(root.get("name")), 
                    "%" + criteria.getQuery().toLowerCase() + "%"),
                cb.like(cb.lower(root.get("description")), 
                    "%" + criteria.getQuery().toLowerCase() + "%"),
                cb.like(cb.lower(root.get("streetAddress")), 
                    "%" + criteria.getQuery().toLowerCase() + "%"),
                cb.like(cb.lower(root.get("city")), 
                    "%" + criteria.getQuery().toLowerCase() + "%"),
                cb.like(cb.lower(root.get("state")), 
                    "%" + criteria.getQuery().toLowerCase() + "%"),
                cb.like(cb.lower(root.get("zipcode")), 
                    "%" + criteria.getQuery().toLowerCase() + "%"),
                cb.like(cb.lower(root.get("clientName")), 
                    "%" + criteria.getQuery().toLowerCase() + "%"),
                cb.like(cb.lower(root.get("clientEmail")), 
                    "%" + criteria.getQuery().toLowerCase() + "%"),
                cb.like(cb.lower(root.get("claimNumber")), 
                    "%" + criteria.getQuery().toLowerCase() + "%")
            );
        };
    }

    // Helper method to check if a string is a valid enum value
    private static <T extends Enum<T>> boolean isValidEnum(String value, Class<T> enumClass) {
        try {
            Enum.valueOf(enumClass, value.toUpperCase());
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}


// @Component
// public class GenericSpecification {
//     public static Specification<Project> createSpecification(ProjectSearchCriteria criteria) {
//         return (root, query, cb) -> {
//             return switch (criteria.getOperation()) {
//                 case EQUALS -> cb.equal(
//                     root.get(criteria.getField()), 
//                     parseFieldValue(criteria.getField(), criteria.getQuery())
//                 );
//                 case CONTAINS -> cb.like(
//                     cb.lower(root.get(criteria.getField())), 
//                     "%" + criteria.getQuery().toLowerCase() + "%"
//                 );
//                 case JOIN_SEARCH -> {
//                     Join<Project, Role> roleJoin = root.join("roles", JoinType.LEFT);
//                     yield cb.like(
//                         cb.lower(roleJoin.get("user").get("fullName")),
//                         "%" + criteria.getQuery().toLowerCase() + "%"
//                     );
//                 }
//                 // Add other operations as needed
//                 default -> null;
//             };
//         };
//     }

//     private static Object parseFieldValue(String field, String value) {
//         return switch (field) {
//             case "stage" -> ProjectStage.valueOf(value.toUpperCase());
//             case "lossType" -> LossType.valueOf(value.toUpperCase());
//             case "projectType" -> ProjectType.valueOf(value.toUpperCase());
//             default -> value;
//         };
//     }
// }