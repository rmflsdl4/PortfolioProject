package com.portfolio.gubot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.gubot.db.ChatList;
import com.portfolio.gubot.db.ChatLog;
import com.portfolio.gubot.dto.ChatListRequest;
import com.portfolio.gubot.dto.ChatLogRequest;
import com.portfolio.gubot.service.ChatListService;
import com.portfolio.gubot.service.ChatLogService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/Chat")
public class ChatController {
    @Autowired
    private ChatListService chatListService;

    @Autowired
    private ChatLogService chatLogService;

    //채팅방 저장
    @PostMapping("/createChatList")
    public ResponseEntity<String> createChatList(@RequestBody ChatListRequest request) {
        chatListService.createChatList(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("채팅방 생성");
    }

    //채팅방 불러오기
    @PostMapping("/getChatlists")
    public List<ChatList> getChatLists(@RequestBody String userId) {
        return chatListService.getChatLists(userId);
    }

    //채팅로그 저장
    @PostMapping("/saveChatLog")
    public ResponseEntity<String> saveChatLog(@RequestBody ChatLogRequest request) {
        chatLogService.saveChatLog(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("채팅로그 저장");
    }

    //채팅로그 불러오기
    @PostMapping("/getChatLogs")
    public List<ChatLog> geChatLogs(@RequestBody int chatListNum) {
        return chatLogService.getChatLogs(chatListNum);
    }
    
    
}
