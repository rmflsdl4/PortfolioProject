package com.portfolio.gubot.repository;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.gubot.db.ChatLog;

public interface ChatLogRepository extends JpaRepository<ChatLog, BigInteger> {
    List<ChatLog> findByChatListNum_ChatListNum(int chatListNum);
}
