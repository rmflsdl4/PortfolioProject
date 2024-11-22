package com.portfolio.gubot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ConfigurationPropertiesScan
@SpringBootApplication
public class GubotApplication {

	public static void main(String[] args) {
		SpringApplication.run(GubotApplication.class, args);
	}

}
