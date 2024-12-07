package com.portfolio.gubot.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.gubot.db.Users;
import com.portfolio.gubot.dto.UserLoginRequest;
import com.portfolio.gubot.dto.UserSearchRequest;
import com.portfolio.gubot.dto.UserSingUpRequest;
import com.portfolio.gubot.repository.UserRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/User")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    //회원가입
    @PostMapping("signUp")
    public ResponseEntity<Map<String, String>> signUp(@RequestBody UserSingUpRequest request) {

        if (userRepository.existsById(request.getUserId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "사용불가한 아이디 입니다."));
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
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "회원가입 성공!"));
    }
    

    //로그인
    @PostMapping("/login")
    public Users login(@RequestBody UserLoginRequest request) {
        Optional<Users> loginUser = userRepository.findByUserIdAndPassword(request.getUserId(), request.getPassword());

        System.out.println("ID: " + loginUser.get().getUserId() + "PASSWORD: " + loginUser.get().getPassword());

        if (loginUser.isPresent()) {
            System.out.println("로그인 성공: " + "ID: " + loginUser.get().getUserName());
            return loginUser.get();
        }
        else {
            throw new RuntimeException("로그인에 실패");
        }
    }

    //이름, 이메일, 생년월일, 학번으로 찾기
    @PostMapping("/find")
    public Users findUser(@RequestBody UserSearchRequest request) {
        Optional<Users> user = userRepository.findByUserNameAndEmailAndBirthdayAndStudentId(
            request.getUserName(), request.getEmail(), request.getBirthday(), request.getStudentId());
        
        if (user.isPresent()) {
            return user.get();
        }
        else {
            throw new RuntimeException("등록되지 않은 사용자입니다.");
        }
    }

    //모든 사용자 검색
    @GetMapping("/all")
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }
    
}
