package com.portfolio.gubot.db;

import java.security.Timestamp;

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
@Table(name = "user_opinion")
public class UserOpinion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "opinion_num", nullable = false)
    private int opinionNum;

    @Column(name = "opinion_title", nullable = false)
    private String opinionTitle;

    @Column(name = "opinion_content", nullable = false)
    private String opinionContent;

    @Column(name = "opinion_date", nullable = false)
    private Timestamp opinionDate;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;
}
