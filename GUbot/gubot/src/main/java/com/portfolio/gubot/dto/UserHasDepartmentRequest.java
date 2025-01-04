package com.portfolio.gubot.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserHasDepartmentRequest {
    private int userHasDeptNum;
    private int DeptNum;
    private String userId;
}
