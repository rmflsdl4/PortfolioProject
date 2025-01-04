package com.portfolio.gubot.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSearchRequest {
    private String name;
    private LocalDate birthDate;
    private int gender;
    private String email;
}
