package com.portfolio.gubot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.gubot.db.UserOpinion;

public interface UserOpinionRepository extends JpaRepository<UserOpinion,Integer>{

    
}
