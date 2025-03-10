package com.portfolio.gubot.service;

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
    
    @Override
    public ChatLog saveChatLog(ChatLogRequest request){
        ChatList chatList = chatListRepository.findById(request.getChatListNum())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 채팅방입니다."));


        ChatLog chatLog = new ChatLog();

        chatLog.setChatContent(request.getChatContent());
        chatLog.setChatDate(request.getChatDate());
        chatLog.setChatListNum(chatList);
        

        return chatLogRepository.save(chatLog);
    }
    /*
    public String signUp(UserSignUpRequest request) {
        if (userRepository.existsById(request.getId())) {
            return "사용불가한 아이디 입니다.";
        }

        User user = new User(
            request.getId(),
            request.getPw(),
            request.getName(),
            request.getEmail(),
            request.getGender(),
            request.getBirthDate()
        );

        userRepository.save(user);
        return "회원가입 성공!";
    }
     */
    
}
