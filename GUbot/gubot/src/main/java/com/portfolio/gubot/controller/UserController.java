package com.portfolio.gubot.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.gubot.db.User;
import com.portfolio.gubot.dto.UserLoginRequest;
import com.portfolio.gubot.dto.UserSearchRequest;
import com.portfolio.gubot.dto.UserSingUpRequest;
import com.portfolio.gubot.repository.UserRepository;
import com.portfolio.gubot.service.UserSingUpService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/User")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSingUpService userService;

    //회원가입
    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(@RequestBody UserSingUpRequest request) {
        String result = userService.signUp(request);

        if ("회원가입 성공!".equals(result)) {
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } 
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }
    }

    //로그인
    @PostMapping("/login")
    public User login(@RequestBody UserLoginRequest request) {
        Optional<User> loginUser = userRepository.findByIdAndPw(request.getId(), request.getPw());

        System.out.println("ID: " + loginUser.get().getId() + "PASSWORD: " + loginUser.get().getPw());

        if (loginUser.isPresent()) {
            System.out.println("로그인 성공: " + "ID: " + loginUser.get().getName());
            return loginUser.get();
        }
        else {
            throw new RuntimeException("로그인에 실패");
        }
    }

    //이름, 이메일, 생년월일, 학번으로 찾기
    @PostMapping("/find")
    public User findUser(@RequestBody UserSearchRequest request) {
        Optional<User> user = userRepository.findByNameAndEmailAndBirthdateAndGender(
            request.getName(), request.getEmail(), request.getBirthdate(), request.getGender());
        
        if (user.isPresent()) {
            return user.get();
        }
        else {
            throw new RuntimeException("등록되지 않은 사용자입니다.");
        }
    }

    

    //모든 사용자 검색
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
}
