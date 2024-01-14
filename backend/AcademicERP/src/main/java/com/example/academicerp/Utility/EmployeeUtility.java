package com.example.academicerp.Utility;

import com.example.academicerp.Entities.Employee;
import com.example.academicerp.Repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeUtility {

    @Autowired
    public EmployeeRepository employeeRepository;

    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployee() {
        return (List<Employee>) employeeRepository.findAll();
    }

    public Optional<Employee> getEmployee(int id) {
        return employeeRepository.findById(id);
    }

    public void deleteEmployee(int id) {
        employeeRepository.deleteById(id);
    }

    public List<Employee> getEmployeeByDept(int id) { return (List<Employee>) employeeRepository.getEmployeeByDept(id); }

    public Employee getEmployeeByEmail(String email) { return employeeRepository.getEmployeeByEmail(email); }

    public int getDepartmentCount(int id) { return employeeRepository.getDepartmentCount(id); }
}
