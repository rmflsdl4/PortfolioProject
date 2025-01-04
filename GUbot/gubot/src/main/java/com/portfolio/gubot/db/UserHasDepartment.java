package com.portfolio.gubot.db;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "user_has_department")
public class UserHasDepartment {
    @Id
    @Column(name = "user_has_dept_num", nullable = false)
    private int userHasDeptNum;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;  // User 엔티티와의 관계 (user_id 외래 키)

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "dept_num", referencedColumnName = "dept_num", nullable = false)
    private Department department;  // Department 엔티티와의 관계 (dept_num 외래 키)
}
