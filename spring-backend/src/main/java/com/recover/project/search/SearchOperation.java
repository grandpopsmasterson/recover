package com.recover.project.search;

public enum SearchOperation {
    EQUALS,
    CONTAINS,
    IN,
    GREATER_THAN,
    LESS_THAN,
    BETWEEN,
    JOIN_SEARCH  // for relationships like team members
}
