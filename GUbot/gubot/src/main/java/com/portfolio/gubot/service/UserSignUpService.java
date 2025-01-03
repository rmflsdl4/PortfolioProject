package com.portfolio.gubot.service;

import com.portfolio.gubot.dto.UserSignUpRequest;

public interface UserSignUpService {
    String signUp(UserSignUpRequest request);
}