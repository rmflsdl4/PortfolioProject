package com.portfolio.gubot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.gubot.db.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

    
}