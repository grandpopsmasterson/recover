package com.udacity.jwdnd.c1.review.dto.project;

import com.udacity.jwdnd.c1.review.model.Role;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter @Setter
public class AssignUser {
    private Long userId;
    private Role role;  // MANAGER, TECHNICIAN, etc.

}
