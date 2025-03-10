package com.portfolio.gubot.dto;

import java.math.BigInteger;
import java.time.LocalDateTime; 

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatLogRequest {
    private BigInteger chatLogNum;
    private String chatContent;
    private LocalDateTime chatDate;
    private int chatListNum;
}
