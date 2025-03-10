package com.portfolio.gubot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.gubot.db.ChatList;
import com.portfolio.gubot.db.User;
import com.portfolio.gubot.dto.ChatListRequest;
import com.portfolio.gubot.repository.ChatListRepository;
import com.portfolio.gubot.repository.UserRepository;

@Service
public class ChatListServiceImpl implements ChatListService {
    @Autowired
    private ChatListRepository chatListRepository;

    @Autowired
    private UserRepository userRepository;

    public ChatList createChatList(ChatListRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("알 수 없는 유저ID입니다."));

        ChatList chatList = new ChatList();

        chatList.setChatTitle(request.getChatTitle());
        chatList.setUser(user);

        return chatListRepository.save(chatList);
    }
}
