package com.portfolio.gubot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.gubot.db.Users;
import com.portfolio.gubot.dto.UserSingUpRequest;
import com.portfolio.gubot.repository.UserRepository;

@Service
public class UserSingUpServiceImpl implements UserSingUpService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public String signUp(UserSingUpRequest request) {
        if (userRepository.existsById(request.getUserId())) {
            return "사용불가한 아이디 입니다.";
        }

        Users user = new Users(
            request.getUserId(),
            request.getPassword(),
            request.getUserName(),
            request.getEmail(),
            request.getStudentId(),
            request.getBirthday()
        );

        userRepository.save(user);
        return "회원가입 성공!";
    }
}
