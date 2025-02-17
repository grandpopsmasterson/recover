package com.recover.project.utils.constants;

import com.google.common.collect.BiMap;
import com.google.common.collect.ImmutableBiMap;
import com.recover.project.model.enums.LossType;

public class LossTypeMap {
    public static final BiMap<String, LossType> LOSS_MAP = ImmutableBiMap.of(
        "FIRE", LossType.FIRE,
        "WATER", LossType.WATER,
        "MOLD", LossType.MOLD,
        "OTHER", LossType.OTHER
    );
}
