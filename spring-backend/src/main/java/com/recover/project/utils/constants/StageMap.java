package com.recover.project.utils.constants;

import com.google.common.collect.BiMap;
import com.google.common.collect.ImmutableBiMap;
import com.recover.project.model.enums.ProjectStage;

public class StageMap {
    public static final BiMap<String, ProjectStage> STAGE_MAP = ImmutableBiMap.of(
        "PENDING SALE", ProjectStage.PENDING_SALE,
        "PRE_PRODUCTION", ProjectStage.PRE_PRODUCTION,
        "ESTIMATION", ProjectStage.ESTIMATION,
        "MITIGATION", ProjectStage.MITIGATION,
        "RECONSTRUCTION", ProjectStage.RECONSTRUCTION,
        "ACCOUNTS_RECEIVABLE", ProjectStage.ACCOUNTS_RECEIVABLE,
        "COMPLETE", ProjectStage.COMPLETE
    );
}
