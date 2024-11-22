package com.portfolio.gubot.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class RestControllor {

    @RequestMapping(value = "/valueTest", method=RequestMethod.GET)
    public String restTest() {
        String value = "RestControllor";
        return value;
    }
    
    
}
