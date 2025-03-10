package com.portfolio.gubot.service;

import java.util.List;

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

    // 채팅방 생성
    public ChatList createChatList(ChatListRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("알 수 없는 유저ID입니다."));

        ChatList chatList = new ChatList();

        chatList.setChatTitle(request.getChatTitle());
        chatList.setUser(user);

        return chatListRepository.save(chatList);
    }

    // 채팅목록 불러오기
    public List<ChatList> getChatLists(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        // 해당 유저가 속한 채팅목록 조회
        return chatListRepository.findByUser(user);
    }
}
