package com.recover.project.utils.constants;

import com.google.common.collect.BiMap;
import com.google.common.collect.ImmutableBiMap;
import com.recover.project.model.enums.UserType;

public class UserTypeMap {
    public static final BiMap<String, UserType> USER_MAP = ImmutableBiMap.of(
        "ADJUSTER", UserType.ADJUSTER,
        "CLIENT", UserType.CLIENT,
        "MANAGER", UserType.MANAGER,
        "TECHNICIAN", UserType.TECHNICIAN,
        "VIEWER", UserType.VIEWER,
        "EDITOR", UserType.EDITOR
    );
}
