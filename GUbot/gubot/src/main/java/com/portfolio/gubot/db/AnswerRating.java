package com.portfolio.gubot.db;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "answer_rating")
public class AnswerRating {
    @Column(name = "rating", nullable = false)
    private int rating;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "chat_log_num", referencedColumnName = "chat_log_num", nullable = false)
    private ChatLog chatLog;
}