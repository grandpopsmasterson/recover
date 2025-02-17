package com.recover.project.search;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProjectSearchCriteria {
    private String groupBy;  // what we're grouping by (stage, lossType, etc)
    private String query;  // search term
   //private SearchOperation operation;
}
