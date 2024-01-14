package com.example.academicerp.Security;

import com.example.academicerp.Entities.Department;
import com.example.academicerp.Entities.Employee;
import com.example.academicerp.Entities.User;
import com.example.academicerp.Repositories.DepartmentRepository;
import com.example.academicerp.Repositories.EmployeeRepository;
import com.example.academicerp.Repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;
    private EmployeeRepository employeeRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Employee employee = employeeRepository.getEmployeeByEmail(email);
        User user = userRepository.finUserByEmail(email);

        if (user != null) {
            GrantedAuthority authority = new SimpleGrantedAuthority(employee.getDepartment().getName());
            return new org.springframework.security.core.userdetails.User(employee.getEmail(),
                    user.getPassword(),
                    Collections.singletonList(authority));
        }else{
            throw new UsernameNotFoundException("Invalid username or password.");
        }
    }
}