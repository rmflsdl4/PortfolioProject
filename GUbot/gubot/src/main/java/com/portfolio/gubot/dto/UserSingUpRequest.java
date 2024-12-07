package com.portfolio.gubot.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSingUpRequest {
    private String userId;
    private String password;
    private String userName;
    private String email;
    private String studentId;
    private LocalDate birthday;
}
