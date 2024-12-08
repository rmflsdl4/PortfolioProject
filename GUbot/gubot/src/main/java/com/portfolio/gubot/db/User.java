package com.portfolio.gubot.db;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "user")
public class User {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "pw", nullable = false)
    private String pw;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "gender", nullable = false)
    private int gender;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    public User() {}

    public User(String id, String pw, String name, String email, int gender, LocalDate birthDate) {
        this.id = id;
        this.pw = pw;
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.birthDate = birthDate;
    }
}
