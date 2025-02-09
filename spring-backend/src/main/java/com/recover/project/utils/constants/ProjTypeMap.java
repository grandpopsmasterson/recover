package com.recover.project.utils.constants;

import java.util.Map;

import com.recover.project.model.enums.ProjectType;

public class ProjTypeMap {
    public static final Map<String, ProjectType> ProjType_MAP = Map.of(
        "RESIDENTIAL", ProjectType.RESIDENTIAL,
        "COMMERCIAL", ProjectType.COMMERCIAL,
        "INDUSTRIAL", ProjectType.INDUSTRIAL,
        "OTHER", ProjectType.OTHER
    );
}
