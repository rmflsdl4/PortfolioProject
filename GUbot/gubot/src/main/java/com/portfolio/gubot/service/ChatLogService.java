package com.portfolio.gubot.service;

import java.util.List;

import com.portfolio.gubot.db.ChatLog;
import com.portfolio.gubot.dto.ChatLogRequest;

public interface ChatLogService {
    ChatLog saveChatLog(ChatLogRequest request);
    List<ChatLog> getChatLogs(int chatListNum);
}
