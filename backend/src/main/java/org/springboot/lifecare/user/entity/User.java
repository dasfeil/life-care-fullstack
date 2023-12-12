package org.springboot.lifecare.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @Column(unique = true, nullable = false)
    private Integer empNo;

    @Column(nullable = false)
    private String empName;

    @Column(nullable = false)
    private String encodedPassword;

    @Column(nullable = false)
    private UserRole userRole;
}
