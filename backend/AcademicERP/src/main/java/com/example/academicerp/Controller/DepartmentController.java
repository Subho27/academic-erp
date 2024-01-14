package com.example.academicerp.Controller;

import com.example.academicerp.DTO.DetailDTO;
import com.example.academicerp.Entities.Department;
import com.example.academicerp.Entities.Employee;
import com.example.academicerp.Entities.User;
import com.example.academicerp.Utility.DepartmentUtility;
import com.example.academicerp.Utility.EmployeeUtility;
import com.example.academicerp.Utility.UserUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/departments")
@Configurable
public class DepartmentController {

    @Autowired
    public DepartmentUtility departmentUtility;

    @Autowired
    public EmployeeUtility employeeUtility;

    @Autowired
    public UserUtility userUtility;

    @PostMapping(value = "/add")
    public ResponseEntity<?> AddDepartment(@RequestBody Department department) {
        try {
            Boolean departmentExist = DepartmentExists(department);
            if(Boolean.TRUE.equals(departmentExist)) {
                return ResponseEntity.status(500).body("Department name already exist.");
            }
            department.setName(department.getName().toUpperCase());
            Department result = departmentUtility.addDepartment(department);
            return ResponseEntity.of(Optional.of(result));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("There is an Exception");
        }
    }

    public Boolean DepartmentExists(@RequestBody Department department) {
        try {
            List<Department> departmentList = departmentUtility.getAllDepartments();
            assert departmentList != null;
            for(Department department1: departmentList) {
                if(department1.getName().equals(department.getName())) {
                    return true;
                }
            }
            return false;
        }
        catch (Exception e) {
            return null;
        }
    }

    @GetMapping(value = "/get-all")
    public ResponseEntity<?> GetAllDepartment() {
        try {
            List<Department> result = departmentUtility.getAllDepartments();
            return ResponseEntity.of(Optional.of(result));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("There is an Exception");
        }
    }

    @GetMapping(value = "/get/detail")
    public ResponseEntity<?> GetDepartmentDetail() {
        try {
            List<Department> departmentList = departmentUtility.getAllDepartments();
            List<DetailDTO> detailDTOList = new ArrayList<>();
            for(Department department : departmentList) {
                long count = employeeUtility.getDepartmentCount(department.getId());
                DetailDTO detailDTO = new DetailDTO();
                detailDTO.setName(department.getName());
                detailDTO.setCapacity(department.getCapacity());
                detailDTO.setStrength(count);
                detailDTOList.add(detailDTO);
            }
            return ResponseEntity.of(Optional.of(detailDTOList));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("There is an Exception");
        }
    }

    @GetMapping(value = "/get/{id}")
    public ResponseEntity<?> GetDepartment(@PathVariable int id ) {
        try {
            boolean existDepartment = departmentUtility.existDepartment(id);
            if(!existDepartment) {
                return ResponseEntity.status(500).body("Department does not exist.");
            }
            Optional<Department> result = departmentUtility.getDepartment(id);
            return ResponseEntity.of(Optional.of(result));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("There is an Exception");
        }
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<?> UpdateDepartment(@PathVariable int id, @RequestBody Department departments) {
        try {
            boolean existDepartment = departmentUtility.existDepartment(id);
            if(!existDepartment) {
                return ResponseEntity.status(500).body("Department does not exist.");
            }
            Optional<Department> result = departmentUtility.getDepartment(id);
            if(result.isPresent() && result.get().getId() == id) {
                departments.setId(result.get().getId());
                result = Optional.ofNullable(departmentUtility.addDepartment(departments));
                return ResponseEntity.of(Optional.of(result));
            }
            return ResponseEntity.of(Optional.empty());
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("There is an Exception.");
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> DeleteDepartment(@PathVariable int id){
        try {
            boolean existDepartment = departmentUtility.existDepartment(id);
            if(!existDepartment) {
                return ResponseEntity.of(Optional.of("{ 'status' : 'failure' }"));
            }
            Optional<Department> department = departmentUtility.getDepartment(7);
            List<Employee> employees = employeeUtility.getEmployeeByDept(id);
            for (Employee em : employees) {
                User user = userUtility.finUserByEmail(em.getEmail());
                user.setActive(false);
                user = userUtility.addUser(user);
                if(user == null || user.getId() == 0) {
                    return ResponseEntity.status(500).body("User could not be saved after deleting department.");
                }
                em.setDepartment(department.get());
                Employee temp = employeeUtility.addEmployee(em);
                if(temp == null || temp.getId() == 0) {
                    return ResponseEntity.status(500).body("Employee could not be saved after deleting department.");
                }
            }
            departmentUtility.deleteDepartment(id);
            return ResponseEntity.of(Optional.of("{ 'status' : 'success' }"));
        }
        catch (Exception e) {
            return ResponseEntity.of(Optional.of("{ 'status' : 'failure' }"));
        }
    }
}
