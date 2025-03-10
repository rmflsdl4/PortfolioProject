package com.portfolio.gubot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.gubot.db.ChatList;
import com.portfolio.gubot.db.User;

public interface ChatListRepository extends JpaRepository<ChatList,Integer> {
    List<ChatList> findByUser(User user);
}
