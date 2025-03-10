package com.portfolio.gubot.service;

import com.portfolio.gubot.db.ChatList;
import com.portfolio.gubot.dto.ChatListRequest;

public interface ChatListService {
    ChatList createChatList(ChatListRequest request);
}
