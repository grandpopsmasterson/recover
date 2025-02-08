package com.recover.project.utils.constants;

import java.util.Map;

import com.recover.project.model.enums.ProjectType;

public class ProjTypeMap {
    public static final Map<String, ProjectType> ProjType_MAP = Map.of(
        "1", ProjectType.RESIDENTIAL,
        "2", ProjectType.COMMERCIAL,
        "3", ProjectType.INDUSTRIAL,
        "4", ProjectType.OTHER
    );
}
