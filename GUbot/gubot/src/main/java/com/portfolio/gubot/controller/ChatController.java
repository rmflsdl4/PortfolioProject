package com.portfolio.gubot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Map<String, Object>> createChatList(@RequestBody ChatListRequest request) {
        ChatList chatList = chatListService.createChatList(request);

        Map<String, Object> response = new HashMap<>();
        response.put("chatListNum", chatList.getChatListNum());
 
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    //채팅방 불러오기
    @PostMapping("/getChatlists")
    public List<ChatList> getChatLists(@RequestBody String userId) {
        userId = userId.replace("\"", "").trim();
        return chatListService.getChatLists(userId);
    }

    //채팅로그 저장
    @PostMapping("/saveChatLog")
    public ResponseEntity<String> saveChatLog(@RequestBody ChatLogRequest request) {
        System.out.println(request);
        chatLogService.saveChatLog(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("채팅로그 저장");
    }

    //채팅로그 불러오기
    @PostMapping("/getChatLogs")
    public List<ChatLog> getChatLogs(@RequestBody Map<String, Integer> request) {
        int chatListNum = request.get("chatListNum");
        return chatLogService.getChatLogs(chatListNum);
    }
    
    @PostMapping("/updateChatTitle")
    public ResponseEntity<String> updateChatTitle(@RequestBody Map<String, Object> request) {
        int chatListNum = (int) request.get("chatListNum");
        String newTitle = (String) request.get("chatTitle");

        chatListService.updateChatListTitle(chatListNum, newTitle);
        return ResponseEntity.ok("채팅방 제목이 변경되었습니다.");
    }

    @PostMapping("/deleteChat")
    public ResponseEntity<String> deleteChat(@RequestBody Map<String, Integer> request) {
        int chatListNum = request.get("chatListNum");
        chatListService.deleteChat(chatListNum);
        return ResponseEntity.ok("채팅방이 삭제되었습니다.");
    }

    @PostMapping("/deleteAllChatList")
    public ResponseEntity<String> deleteAllChatLists(@RequestBody String userId) {
        userId = userId.replace("\"", "").trim();
        chatListService.deleteAllChatLists(userId);
        return ResponseEntity.ok("모든 채팅방이 삭제되었습니다.");
    }
}
