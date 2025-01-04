package com.portfolio.gubot.dto;

import java.math.BigInteger;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatLogRequest {
    private BigInteger chatLogNum;
    private String chatContent;
    private LocalDate chatDate;
    private int chatListNum;
}
