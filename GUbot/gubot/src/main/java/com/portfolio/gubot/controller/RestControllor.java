package com.portfolio.gubot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllor {

    @GetMapping("/valueTest")
    public String restTest() {
        String value = "RestControllor";
        return value;
    }
    
    
}
