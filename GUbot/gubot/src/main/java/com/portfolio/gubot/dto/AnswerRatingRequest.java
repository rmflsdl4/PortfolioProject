package com.portfolio.gubot.dto;

import java.math.BigInteger;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerRatingRequest {
    private int ratingNum;
    private int rating;
    private BigInteger chatLogNum;
}
