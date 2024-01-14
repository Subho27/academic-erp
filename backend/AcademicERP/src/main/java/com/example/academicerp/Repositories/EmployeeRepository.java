package com.example.academicerp.Repositories;

import com.example.academicerp.Entities.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Integer> {

    @Query("SELECT e FROM employee e join departments d on e.department = d WHERE d.id = ?1")
    Iterable<Employee> getEmployeeByDept(int id);

    @Query("SELECT e from employee e where e.email = ?1")
    Employee getEmployeeByEmail(String email);

    @Query("SELECT count(e) from employee e where e.department.id = ?1")
    int getDepartmentCount(int id);

}
