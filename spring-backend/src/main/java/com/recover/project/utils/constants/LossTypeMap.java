package com.recover.project.utils.constants;

import java.util.Map;

import com.recover.project.model.enums.LossType;

public class LossTypeMap {
    public static final Map<String, LossType> LOSS_MAP = Map.of(
        "FIRE", LossType.FIRE,
        "WATER", LossType.WATER,
        "WATER1", LossType.WATER,
        "WATER2", LossType.WATER,
        "WATER3", LossType.WATER,
        "MOLD", LossType.MOLD,
        "OTHER", LossType.OTHER
    );
}
