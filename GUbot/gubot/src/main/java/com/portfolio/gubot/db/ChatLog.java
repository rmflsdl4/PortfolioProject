package com.portfolio.gubot.db;

import java.math.BigInteger;
import java.sql.Timestamp;

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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="chat_log_num", nullable = false)
    private BigInteger chatLogNum;

    @Column(name="chat_content", nullable = false)
    private String chatContent;

    @Column(name="chat_date", nullable = false)
    private Timestamp chatDate;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="chat_list_num", referencedColumnName = "chat_list_num", nullable = false)
    private ChatList chatList;
}
