package com.recover.project.utils.constants;

import com.google.common.collect.BiMap;
import com.google.common.collect.ImmutableBiMap;
import com.recover.project.model.enums.ProjectType;

public class ProjTypeMap {
    public static final BiMap<String, ProjectType> ProjType_MAP = ImmutableBiMap.of(
        "RESIDENTIAL", ProjectType.RESIDENTIAL,
        "COMMERCIAL", ProjectType.COMMERCIAL,
        "INDUSTRIAL", ProjectType.INDUSTRIAL,
        "OTHER", ProjectType.OTHER
    );
}
