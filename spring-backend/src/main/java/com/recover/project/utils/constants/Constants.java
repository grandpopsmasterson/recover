package com.recover.project.utils.constants;

import java.util.Map;
import com.recover.project.model.enums.ProjectRole;
import com.recover.project.model.enums.UserType;

public final class Constants {
    public static final Map<UserType, ProjectRole> ROLE_MAP = Map.of(
        UserType.ADJUSTER, ProjectRole.ADJUSTER,
        UserType.TECHNICIAN, ProjectRole.TECHNICIAN,
        UserType.CLIENT, ProjectRole.CLIENT,
        UserType.MANAGER, ProjectRole.MANAGER
    );
}