package com.portfolio.gubot.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSearchRequest {
    private String userName;
    private LocalDate birthday;
    private String studentId;
    private String email;
}
