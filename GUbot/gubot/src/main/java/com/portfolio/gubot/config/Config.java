package com.portfolio.gubot.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "gateway")
public class Config {
    
}
