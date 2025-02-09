package com.recover.project.utils.constants;

import java.util.Map;

import com.recover.project.model.enums.ProjectStage;

public class StageMap {
    public static final Map<Integer, ProjectStage> STAGE_MAP = Map.of(
        1, ProjectStage.INITIAL,
        2, ProjectStage.INSPECTION,
        3, ProjectStage.ESTIMATE,
        4, ProjectStage.MITIGATION,
        5, ProjectStage.RESTORATION,
        6, ProjectStage.ACCOUNTS_RECEIVABLE,
        7, ProjectStage.COMPLETED
    );
}
