package com.portfolio.gubot.db;

import java.math.BigInteger;
import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="chat_log")
public class ChatLog {

    //채팅로그 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="chat_log_num", nullable = false)
    private BigInteger chatLogNum;

    //채팅 내용
    @Column(name="chat_content", nullable = false)
    private String chatContent;

    //채팅 날짜+시간
    @Column(name="chat_date", nullable = false)
    private LocalDateTime chatDate;

    //채팅 수신자
    @Column(name="chat_sender", nullable = false)
    private int chatSender;

    //외래키 참조 ChatList:chatListNum
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="chat_list_num", referencedColumnName = "chat_list_num", nullable = false)
    private ChatList chatListNum;

    public ChatLog() {}

    public ChatLog(String chatContent, LocalDateTime chatDate, ChatList chatListNum){
        this.chatContent = chatContent;
        this.chatDate = chatDate;
        this.chatListNum = chatListNum;
    }
}
