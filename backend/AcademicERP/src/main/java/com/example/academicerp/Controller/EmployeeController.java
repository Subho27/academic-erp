package com.example.academicerp.Controller;

import com.example.academicerp.Entities.Employee;
import com.example.academicerp.Utility.DepartmentUtility;
import com.example.academicerp.Utility.EmployeeUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeUtility employeeUtility = new EmployeeUtility();

    @Autowired
    private DepartmentUtility departmentUtility;

    @PostMapping("/add")
    public ResponseEntity<?> AddEmployee(@RequestBody Employee employee) {
        try {
            Boolean employeeExists = EmployeeExists(employee);
            if(Boolean.TRUE.equals(employeeExists)) {
                return ResponseEntity.status(500).body("Employee does not exist.");
            }
            Employee result = employeeUtility.addEmployee(employee);
            return ResponseEntity.of(Optional.of(result));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("There is an Exception");
        }
    }

    private Boolean EmployeeExists(@RequestBody Employee employee) {
        try {
            List<Employee> employeeList = employeeUtility.getAllEmployee();
            assert employeeList != null;
            for(Employee employee1: employeeList) {
                if(employee1.getFirst_name().equals(employee.getFirst_name()) &&
                    employee1.getLast_name().equals(employee.getLast_name()) &&
                    employee1.getEmail().equals(employee.getEmail())) {
                    return true;
                }
            }
            return false;
        }
        catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/get-all")
    public  ResponseEntity<?> GetAllEmployee() {
        try {
            List<Employee> result = employeeUtility.getAllEmployee();
            return ResponseEntity.of(Optional.of(result));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("There is an Exception");
        }
    }

    @GetMapping(value = "/get-emp/{id}")
    public ResponseEntity<?> GetEmployee(@PathVariable int id ) {
        try {
            Optional<Employee> result = employeeUtility.getEmployee(id);
            return ResponseEntity.of(Optional.of(result));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("There is an Exception");
        }
    }

    @GetMapping(value = "/get/{id}")
    public ResponseEntity<?> GetEmployeeByDepartment(@PathVariable int id ) {
        try {
            Boolean departmentExist = departmentUtility.existDepartment(id);
            if(Boolean.FALSE.equals(departmentExist)) {
                return ResponseEntity.status(500).body("Department does not exist.");
            }
            List<Employee> result = employeeUtility.getEmployeeByDept(id);
            return ResponseEntity.of(Optional.of(result));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("There is an Exception.");
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> DeleteEmployee(@PathVariable int id){
        try {
            employeeUtility.deleteEmployee(id);
            return ResponseEntity.of(Optional.of("{ 'status' : 'success' }"));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("There is an Exception.");
        }
    }

}
