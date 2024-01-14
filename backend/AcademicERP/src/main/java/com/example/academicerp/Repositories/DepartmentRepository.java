package com.example.academicerp.Repositories;

import com.example.academicerp.Entities.Department;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends CrudRepository<Department, Integer> {

    @Query("SELECT d from departments d where d.name = ?1")
    Department getDepartmentByName(String name);
}
