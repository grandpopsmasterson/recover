// package com.recover.project.search;

// import java.util.function.Function;
// import java.util.stream.Collectors;

// import org.springframework.data.jpa.domain.Specification;
// import org.springframework.stereotype.Component;
// import org.springframework.util.StringUtils;

// import com.recover.project.model.Project;
// import com.recover.project.model.enums.LossType;
// import com.recover.project.model.enums.ProjectRole;
// import com.recover.project.model.enums.ProjectStage;
// import com.recover.project.model.enums.ProjectType;

// @Component
// public class GenericSpecification {
//     public static Specification<Project> createSpecification(ProjectSearchCriteria criteria) {
//         return (root, query, cb) -> {
//             if (!StringUtils.hasText(criteria.getQuery())) {
//                 return null;
//             }

//             // Try to parse enums first
//             try {
//                 // Try to parse as ProjectStage
//                 ProjectStage stage = ProjectStage.valueOf(criteria.getQuery().toUpperCase());
//                 return cb.equal(root.get("stage"), stage);
//             } catch (IllegalArgumentException ignored) {}

//             try {
//                 LossType lossType = LossType.valueOf(criteria.getQuery().toUpperCase());
//                 return cb.equal(root.get("lossType"), lossType);
//             } catch (IllegalArgumentException ignored) {}

//             try {
//                 ProjectType projectType = ProjectType.valueOf(criteria.getQuery().toUpperCase());
//                 return cb.equal(root.get("projectType"), projectType);
//             } catch (IllegalArgumentException ignored) {}

//             // If not an enum, do text search across multiple fields
//             return cb.or(
//                 cb.like(cb.lower(root.get("projectName")), 
//                     "%" + criteria.getQuery().toLowerCase() + "%"),
//                 cb.like(cb.lower(root.get("catReference")), 
//                     "%" + criteria.getQuery().toLowerCase() + "%"),
//                 cb.like(cb.lower(root.get("streetAddress")), 
//                     "%" + criteria.getQuery().toLowerCase() + "%"),
//                 cb.like(cb.lower(root.get("city")), 
//                     "%" + criteria.getQuery().toLowerCase() + "%"),
//                 cb.like(cb.lower(root.get("state")), 
//                     "%" + criteria.getQuery().toLowerCase() + "%"),
//                 cb.like(cb.lower(root.get("zipcode")), 
//                     "%" + criteria.getQuery().toLowerCase() + "%"),
//                 cb.like(cb.lower(root.get("clientName")), 
//                     "%" + criteria.getQuery().toLowerCase() + "%"),
//                 cb.like(cb.lower(root.get("clientEmail")), 
//                     "%" + criteria.getQuery().toLowerCase() + "%"),
//                 cb.like(cb.lower(root.get("claimNumber")), 
//                     "%" + criteria.getQuery().toLowerCase() + "%")
//             );
//         };
//     }
//     public static Function<Project, ?> getGroupingFunction(String groupBy) {
//         return switch (groupBy.toUpperCase()) {
//             case "STAGE" -> Project::getStage;
//             case "SCOPE" -> Project::getScope;
//             case "CARRIER" -> Project::getCarrier;
//             case "LOSS_TYPE" -> Project::getLossType;
//             case "PROJECT_TYPE" -> Project::getProjectType;
//             case "MANAGER" -> project -> project.getRoles().stream()
//             .filter(role -> role.getProjectRole() == ProjectRole.MANAGER)
//             .map(role -> role.getUser().getFullName())
//             .collect(Collectors.joining(", "));
//             case "TECHNICIAN" -> project -> project.getRoles().stream()
//             .filter(role -> role.getProjectRole() == ProjectRole.TECHNICIAN)
//             .map(role -> role.getUser().getFullName())
//             .collect(Collectors.joining(", "));
//             case "ADJUSTER" -> project -> project.getRoles().stream()
//             .filter(role -> role.getProjectRole() == ProjectRole.ADJUSTER)
//             .map(role -> role.getUser().getFullName())
//             .collect(Collectors.joining(", "));
//             default -> throw new IllegalArgumentException("Invalid grouping criteria: " + groupBy);
//         };
//     }

//     // Helper method to check if a string is a valid enum value
//     private static <T extends Enum<T>> boolean isValidEnum(String value, Class<T> enumClass) {
//         try {
//             Enum.valueOf(enumClass, value.toUpperCase());
//             return true;
//         } catch (IllegalArgumentException e) {
//             return false;
//         }
//     }
// }

