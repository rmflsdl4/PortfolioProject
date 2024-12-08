package com.portfolio.gubot.db;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "department")
public class Department {

    @Id
    @Column(name = "dept_num", nullable = false)
    private int deptNum;

    @Column(name = "dept_name", nullable = false)
    private String deptName;

    @Column(name = "dept_url")
    private String deptUrl;
}
