package com.example.academicerp.Utility;

import com.example.academicerp.Entities.Department;
import com.example.academicerp.Repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentUtility {

    @Autowired
    public DepartmentRepository departmentRepository;

    public Department addDepartment(Department departments) {
        return departmentRepository.save(departments);
    }

    public boolean existDepartment(int id) { return departmentRepository.existsById(id); }

    public List<Department> getAllDepartments() {
        return (List<Department>) departmentRepository.findAll();
    }

    public Optional<Department> getDepartment(int id) {
        return departmentRepository.findById(id);
    }

    public void deleteDepartment(int id) {
        departmentRepository.deleteById(id);
    }

    public Department getDepartmentByName(String name) { return departmentRepository.getDepartmentByName(name); }
}
