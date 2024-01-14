package com.example.academicerp.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

import java.util.List;

@Entity(name="departments")
@NoArgsConstructor
@Getter
@Setter
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="department_id")
    private Integer id;

    @Column(name="name", unique = true, nullable = false)
    private String name;

    @Column(name="capacity", nullable = false)
    private Long capacity;

}
