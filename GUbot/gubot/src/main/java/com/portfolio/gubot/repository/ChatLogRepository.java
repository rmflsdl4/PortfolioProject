package com.portfolio.gubot.repository;

import java.math.BigInteger;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.gubot.db.ChatLog;

public interface ChatLogRepository extends JpaRepository<ChatLog, BigInteger> {

    
}
