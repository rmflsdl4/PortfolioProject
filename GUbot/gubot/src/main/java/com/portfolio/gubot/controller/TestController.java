package com.portfolio.gubot.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class TestController {
    @GetMapping("/api/test")
    public String getTestData() {
        return "{\"message\": \"Hello from Spring Boot!\"}";
    }
    
}
