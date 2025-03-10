package com.portfolio.gubot.db;

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
@Table(name="chat_list")
public class ChatList {

    //채팅방 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="chat_list_num", nullable = false)
    private int chatListNum;

    //채팅방 이름
    @Column(name="chat_title", nullable = false)
    private String chatTitle;

    //외래키 참조 User:user_id
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="user_id", referencedColumnName = "id", nullable = false)
    private User user;

    public ChatList() {}

    public ChatList(String chatTitle, User user) {
        this.chatTitle = chatTitle;
        this.user = user;
    }
}
