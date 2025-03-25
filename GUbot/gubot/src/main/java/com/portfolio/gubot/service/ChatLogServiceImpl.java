package com.portfolio.gubot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.gubot.db.ChatList;
import com.portfolio.gubot.db.ChatLog;
import com.portfolio.gubot.dto.ChatLogRequest;
import com.portfolio.gubot.repository.ChatListRepository;
import com.portfolio.gubot.repository.ChatLogRepository;

@Service
public class ChatLogServiceImpl implements ChatLogService {

    @Autowired
    private ChatLogRepository chatLogRepository;

    @Autowired
    private ChatListRepository chatListRepository;
    
    //채팅로그 저장
    public ChatLog saveChatLog(ChatLogRequest request){
        ChatList chatList = chatListRepository.findById(request.getChatListNum())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 채팅방입니다."));


        ChatLog chatLog = new ChatLog();

        chatLog.setChatContent(request.getChatContent());
        chatLog.setChatDate(request.getChatDate());
        chatLog.setChatListNum(chatList);
        chatLog.setChatSender(request.getChatSender());
        

        return chatLogRepository.save(chatLog);
    }

    //채팅로그 불러오기
    public List<ChatLog> getChatLogs(int chatListNum) {
        chatListRepository.findById(chatListNum)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 채팅방입니다."));

        return chatLogRepository.findByChatListNum_ChatListNum(chatListNum);
    }
}
