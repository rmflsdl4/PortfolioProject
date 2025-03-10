package com.portfolio.gubot.service;

import com.portfolio.gubot.db.ChatLog;
import com.portfolio.gubot.dto.ChatLogRequest;

public interface ChatLogService {
    ChatLog saveChatLog(ChatLogRequest request);
}
