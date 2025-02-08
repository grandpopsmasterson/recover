package com.recover.project.utils.constants;

import java.util.Map;

import com.recover.project.model.enums.Scope;

public class ScopeMap {
    public static final Map<String, Scope> SCOPE_MAP = Map.of(
        "Mitigation", Scope.MITIGATION,
        "mitigation", Scope.MITIGATION,
        "Contents", Scope.CONTENTS,
        "contents", Scope.CONTENTS,
        "Reconstruction", Scope.RECONSTRUCTION,
        "reconstruction", Scope.RECONSTRUCTION
    );
}
