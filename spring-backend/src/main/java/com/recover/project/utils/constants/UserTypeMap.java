package com.recover.project.utils.constants;

import java.util.Map;

import com.recover.project.model.enums.UserType;

public class UserTypeMap {
    public static final Map<String, UserType> USER_MAP = Map.of(
        "ADJUSTER", UserType.ADJUSTER,
        "CLIENT", UserType.CLIENT,
        "MANAGER", UserType.MANAGER,
        "TECHNICIAN", UserType.TECHNICIAN,
        "VIEWER", UserType.VIEWER,
        "EDITOR", UserType.EDITOR
    );
}
