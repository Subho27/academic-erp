package com.example.academicerp.Repositories;

import com.example.academicerp.Entities.Employee;
import com.example.academicerp.Entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    @Query("SELECT e FROM user u join employee e on u.employee = e WHERE u.password = ?2 and e.email = ?1")
    Employee validateUser(String email, String password);

    @Query("SELECT u from user u join employee e on u.employee = e WHERE u.employee.email = ?1")
    User finUserByEmail(String email);

}
