package com.portfolio.gubot.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignUpRequest {
    private String id;
    private String pw;
    private String name;
    private String email;
    private int gender;
    private LocalDate birthDate;
}
