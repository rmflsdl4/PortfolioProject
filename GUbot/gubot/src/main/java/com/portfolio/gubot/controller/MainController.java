package com.portfolio.gubot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @RequestMapping(value = "/")
    public String mainHtml() {
        return "main.html";
    }
    
}
