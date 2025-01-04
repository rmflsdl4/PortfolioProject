package com.portfolio.gubot.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatListRequest {
    private int chatListNum;
    private String chatTitle;
    private int userId;
}
