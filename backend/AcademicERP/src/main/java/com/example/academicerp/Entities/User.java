package com.example.academicerp.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Entity(name="user")
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Integer id;

    @NonNull
    @Column(name="password")
    private String password;

    @NonNull
    @Column(name="active")
    private Boolean active;

    @NonNull
    @Column(name="expired")
    private Boolean expired;

    @OneToOne
    @JoinColumn(name="employee_id", nullable = true)
    private Employee employee;

}
