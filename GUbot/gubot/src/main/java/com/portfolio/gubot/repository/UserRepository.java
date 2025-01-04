package com.portfolio.gubot.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.gubot.db.User;


public interface UserRepository extends JpaRepository<User, String> {

    //로그인
    Optional<User> findByIdAndPw(String id, String pw);

    //이름, 이메일, 생년월일, 학번 데이터 찾기
    Optional<User> findByNameAndEmailAndBirthDateAndGender(
        String Name, String email, LocalDate birthDate, int gender);
}
