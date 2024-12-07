package com.portfolio.gubot.db;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users")
public class Users {
    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(nullable = false)
    private String password;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(nullable = false)
    private String email;

    @Column(name = "student_id", nullable = false)
    private String studentId;

    @Column(nullable = false)
    private LocalDate birthday;

    public Users() {}

    public Users(String user_id, String password, String user_name, String email, String student_id, LocalDate birthday) {
        this.userId = user_id;
        this.password = password;
        this.userName = user_name;
        this.email = email;
        this.studentId = student_id;
        this.birthday = birthday;
    }
    
}