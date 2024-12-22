package com.portfolio.gubot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.gubot.db.ChatList;

public interface ChatListRepository extends JpaRepository<ChatList,Integer> {

    
}
