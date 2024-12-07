package com.portfolio.gubot.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.gubot.db.Users;


public interface UserRepository extends JpaRepository<Users, String> {

    //로그인
    Optional<Users> findByUserIdAndPassword(String userId, String password);

    //이름, 이메일, 생년월일, 학번 데이터 찾기
    Optional<Users> findByUserNameAndEmailAndBirthdayAndStudentId(
        String userName, String email, LocalDate birthday, String studentId);

}
