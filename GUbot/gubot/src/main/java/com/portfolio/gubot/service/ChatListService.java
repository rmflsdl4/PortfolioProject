package com.portfolio.gubot.service;

import java.util.List;

import com.portfolio.gubot.db.ChatList;
import com.portfolio.gubot.dto.ChatListRequest;

public interface ChatListService {
    ChatList createChatList(ChatListRequest request);
    List<ChatList> getChatLists(String userId);
    ChatList updateChatListTitle(int chatListNum, String newTitle);
    void deleteChat(int chatListNum);
    void deleteAllChatLists(String userId);
}
