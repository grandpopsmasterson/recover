package com.recover.project.utils.constants;

import com.google.common.collect.BiMap;
import com.google.common.collect.ImmutableBiMap;
import com.recover.project.model.enums.Scope;

public class ScopeMap {
    public static final BiMap<String, Scope> SCOPE_MAP = ImmutableBiMap.of(
        "MITIGATION", Scope.MITIGATION,
        "CONTENTS", Scope.CONTENTS,
        "RECONSTRUCTION", Scope.RECONSTRUCTION
    );
}
