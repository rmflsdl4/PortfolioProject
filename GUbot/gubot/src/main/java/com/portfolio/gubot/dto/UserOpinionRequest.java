package com.portfolio.gubot.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserOpinionRequest {
    private int opinionNum;
    private String opinionTitle;
    private String opinionContent;
    private LocalDate opinionDate;
    private String userId;
}
