package com.portfolio.gubot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.gubot.db.UserHasDepartment;

public interface UserHasDepartmentRepository extends JpaRepository<UserHasDepartment,Integer> {

    
}
