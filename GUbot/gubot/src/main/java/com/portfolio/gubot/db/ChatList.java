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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="chat_list_num", nullable = false)
    private int chatListNum;

    @Column(name="chat_title", nullable = false)
    private String chatTitle;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="user_id", referencedColumnName = "id", nullable = false)
    private User user;
}
